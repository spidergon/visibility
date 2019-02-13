import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { showSnack } from './state'

/*  --- Init --- */

firebase.initializeApp({
  apiKey: 'AIzaSyACE8Y3FvGgUixMWKUg3XjqvZ7MfOFQ13Q',
  authDomain: 'project-zero-csprod.firebaseapp.com',
  projectId: 'project-zero-csprod',
  storageBucket: 'project-zero-csprod.appspot.com'
})

export default firebase

export const auth = firebase.auth()

export const db = firebase.firestore()

export const storage = firebase.storage()

/*  --- Storage --- */

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

/*  --- FireStore --- */

const storeCollectionName = 'stores'

/**
 * Create a new store in the database.
 * @param {Object} data - the data of the new store.
 */
export function addStore (data) {
  if (auth.currentUser && data && data.slug) {
    const slug = data.slug
    data.created = new Date()
    data.uid = auth.currentUser.uid
    delete data.slug
    return db
      .collection(storeCollectionName)
      .doc(slug)
      .set(data)
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
  return doc.exists
}

/**
 * Get a store by its id.
 * @param {string} id the id of the store.
 */
export async function getStore (id) {
  const doc = await db
    .collection(storeCollectionName)
    .doc(id)
    .get()
  if (doc && doc.exists) return { id, ...doc.data() }
  return null
}

/**
 * Hook that provides the stores for a user.
 * @param {Object} user - the user object.
 * @returns {Object} Object containing { loading, stores }.
 */
export function useMyStores (user) {
  const [loading, setLoading] = useState(false)
  const [stores, setStores] = useState([])

  useEffect(() => {
    if (user && user.uid) {
      setLoading(true)
      db.collection(storeCollectionName)
        .where('uid', '==', user.uid)
        .orderBy('created', 'desc')
        .get()
        .then(snap => {
          const stores = []
          snap.forEach(function (doc) {
            stores.push({ id: doc.id, ...doc.data() })
          })
          setStores(stores)
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
          showSnack("Une erreur interne s'est produite.", 'error')
        })
    }
  }, [user])

  return { loading, stores }
}
