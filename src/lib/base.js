import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import config from '../../firebase/config'
import { showSnack } from './state'

/*  ------------
    --- Init ---
    ------------  */

firebase.initializeApp(config)

export default firebase

export const auth = firebase.auth()

export const db = firebase.firestore()

export const storage = firebase.storage()

/*  ---------------
    --- Storage ---
    ---------------  */

/**
 * Upload a file to the storage.
 * @param {string} name - the name of the file.
 * @param {string} data - the data of the file.
 */
export async function uploadFile (name, data) {
  const uploadRes = await storage
    .ref('stores')
    .child(`${auth.currentUser.uid}/${Date.now()}_${name}`)
    .putString(data, 'data_url')
  return {
    name,
    src: await uploadRes.ref.getDownloadURL(),
    path: uploadRes.ref.location.path
  }
}

/**
 * Delete a file from the storage.
 * @param {string} path - the path of the file to delete.
 */
export function deleteFile (path) {
  return storage
    .ref()
    .child(path)
    .delete()
}

/*  -----------------
    --- FireStore ---
    -----------------  */

const storeCollectionName = 'stores'
const userCollectionName = 'users'

// Configure offline persistence
db.enablePersistence({ synchronizeTabs: true }).catch(err => {
  if (err.code === 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence.
    console.log("Data can't be persisted on your browser")
  }
})
// Subsequent queries will use persistence, if it was enabled successfully

/**
 * Check if a user exists.
 * @param {string} id the id of the user.
 */
export async function userExists (id) {
  const doc = await db
    .collection(userCollectionName)
    .doc(id)
    .get()
    .catch(() => {
      /* Silent is golden */
    })
  if (doc) return doc.exists
  return false
}

/**
 * Create a new user in the database.
 * @param {Object} data - the data of the new user.
 */
export async function addUser (data) {
  if (data && data.uid) {
    if (!(await userExists(data.uid))) {
      const uid = data.uid
      delete data.uid
      return db
        .collection(userCollectionName)
        .doc(uid)
        .set(data)
    }
  }
}

/**
 * Check if a store exists.
 * @param {string} id the id of the store.
 */
export async function storeExists (id) {
  const doc = await db
    .collection(storeCollectionName)
    .doc(id)
    .get()
    .catch(() => {
      /* Silent is golden */
    })
  if (doc) return doc.exists
  return false
}

/**
 * Create a new store in the database.
 * @param {Object} data - the data of the new store.
 */
export function addStore (data) {
  if (auth.currentUser && data && data.slug) {
    const slug = data.slug
    data.author = auth.currentUser.uid
    data.created = new Date()
    data.archived = false
    data.status = 'offline'
    data.fans = []
    data.errorMsg = ''
    delete data.slug
    return db
      .collection(storeCollectionName)
      .doc(slug)
      .set(data)
  }
}

/**
 * Update a store.
 * @param {string} id - the id of the store to be updated.
 * @param {Object} set - the object query to be set.
 * @param {string} successMsg  - message in case of success.
 * @param {string} failMsg - message in case of failure
 * @param {function} callback - the success callback.
 */
export function updateStore (id, set, successMsg, failMsg, callback) {
  if (id) {
    return db
      .collection(storeCollectionName)
      .doc(id)
      .set(set, { merge: true })
      .then(() => {
        showSnack(successMsg, 'success')
        if (typeof callback === 'function') callback()
      })
      .catch(err => {
        console.log(err)
        showSnack(failMsg, 'error')
      })
  }
}

/**
 * Delete a store (will be archived in the database).
 * @param {string} id - the id of the store to be archived.
 * @param {function} callback - the success callback.
 */
export function deleteStore (id, callback) {
  updateStore(
    id,
    { archived: true, status: 'offline' },
    'Votre vitrine a été supprimée avec succès.',
    'Suppression imposible.',
    callback
  )
}

/**
 * Publish a store.
 * @param {string} id - the id of the store to be published.
 * @param {function} callback - the success callback.
 */
export function publishStore (id, callback) {
  updateStore(
    id,
    { status: 'waiting' },
    'Votre vitrine est en attente de publication.',
    'Mise en ligne imposible.',
    callback
  )
}

/**
 * Add a fan to the store or remove it.
 * @param {*} storeId - the id of the store to be updated.
 * @param {*} userId - the user id to add or remove.
 * @param {*} callback - function to execute in case of success.
 * @param {*} isFan - whether the user is fan or not
 */
export function addRemoveStoreFav (storeId, userId, callback, isFan = false) {
  if (storeId && userId) {
    let fans = firebase.firestore.FieldValue.arrayUnion(userId)
    if (isFan) fans = firebase.firestore.FieldValue.arrayRemove(userId)
    return db
      .collection(storeCollectionName)
      .doc(storeId)
      .update({ fans })
      .then(() => {
        if (typeof callback === 'function') callback()
      })
      .catch(err => {
        console.log(err)
        showSnack("Une erreur interne s'est produite.", 'error')
      })
  }
}

/**
 * Hook that provides the store by its id.
 * @param {string} id - the id.
 * @returns {Object} { error, loading, store }.
 */
export function useStore (id) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [store, setStore] = useState(null)

  useEffect(() => {
    const unsubscribe = db
      .collection(storeCollectionName)
      .doc(id)
      .onSnapshot(
        doc => {
          if (doc && doc.exists) setStore({ id, ...doc.data() })
          setLoading(false)
        },
        err => setError(err)
      )
    return () => unsubscribe()
  }, [id])

  return { error, loading, store }
}

// /**
//  * Hook that provides the store by its id.
//  * @param {string} id - the id.
//  * @returns {Object} Object containing { loading, store }.
//  */
// export function useMyStore (id) {
//   const [loading, setLoading] = useState(null)
//   const [store, setStore] = useState(null)

//   useEffect(() => {
//     let cancelled = false
//     if (id) {
//       if (cancelled) return
//       setLoading(true)
//       db.collection(storeCollectionName)
//         .doc(id)
//         .get()
//         .then(doc => {
//           if (cancelled) return
//           if (doc && doc.exists) {
//             setStore({ id, ...doc.data() })
//           }
//           setLoading(false)
//         })
//         .catch(err => {
//           if (cancelled) return
//           setLoading(false)
//           console.log(err)
//           showSnack(`Vitrine introuvable : ${id}`, 'error')
//         })
//     }
//     return () => (cancelled = true) // Cleaning
//   }, [id])

//   return { loading, store }
// }

/** Get the first part of the query depending on user and fav */
function userFavQuery (user, fav) {
  const uid = user ? user.uid : null
  const collection = db.collection(storeCollectionName)
  if (fav) return collection.where('fans', 'array-contains', uid)
  return collection.where('author', '==', uid)
}

/**
 * Hook that provides the stores for a user.
 * @param {Object} user - the user object.
 * @returns {Object} { error, loading, stores }.
 */
export function useMyStores (user, fav = false) {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stores, setStores] = useState([])

  useEffect(() => {
    const unsubscribe = userFavQuery(user, fav)
      .where('archived', '==', false)
      .orderBy('created', 'desc')
      .limit(8)
      .onSnapshot(
        snapshot => {
          const myStores = []
          snapshot.forEach(doc => {
            const data = doc.data()
            data.loved = data.fans.includes(user ? user.uid : null)
            myStores.push({ id: doc.id, ...data })
          })
          setStores(myStores)
          setLoading(false)
        },
        err => setError(err)
      )
    return () => unsubscribe()
  }, [fav, user])

  return { error, loading, stores }
}

// /**
//  * Hook that provides the stores for a user.
//  * @param {Object} user - the user object.
//  * @returns {Object} Object containing { loading, stores }.
//  */
// export function useMyStores_ (user, fav = false) {
//   const [loading, setLoading] = useState(false)
//   const [stores, setStores] = useState([])

//   useEffect(() => {
//     // const cancel = myStores()
//     // return () => cancel() // Cleaning
//     let cancelled = false
//     if (!fav && user && user.uid) {
//       if (cancelled) return
//       setLoading(true)
//       db.collection(storeCollectionName)
//         .where('author', '==', user.uid)
//         .where('archived', '==', false)
//         .orderBy('created', 'desc')
//         .limit(8)
//         .get()
//         .then(snap => {
//           const newStores = []
//           snap.forEach(function (doc) {
//             newStores.push({ id: doc.id, ...doc.data() })
//           })
//           if (cancelled) return
//           setStores(newStores)
//           setLoading(false)
//         })
//         .catch(err => {
//           if (cancelled) return
//           setLoading(false)
//           console.log(err)
//           showSnack("Une erreur interne s'est produite.", 'error')
//         })
//     }
//     return () => (cancelled = true) // Cleaning
//   }, [fav, user])

//   return { loading, stores }
// }
