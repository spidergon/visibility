import { useContext, useEffect, useRef, useState } from 'react'
import FirebaseContext from './context'
import { storeCollectionName } from './firebase'

export const useFirebase = () => useContext(FirebaseContext)

export const useAuth = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  const firebase = useFirebase()

  const didCancel = useRef(false)
  useEffect(() => () => (didCancel.current = true), [])

  // useEffect(() => {
  //   setInitializing(!user)
  // }, [user])

  const authHandler = authUser => {
    if (didCancel.current) return
    setUser(authUser)
    setInitializing(false)
  }

  useEffect(() => {
    if (firebase) {
      // listen for auth state changes
      const unsubscribe = firebase.onAuthUserListener(
        authUser => authHandler(authUser), // on success
        () => authHandler(null)
      )
      // unsubscribe to the listener when unmounting
      return () => unsubscribe()
    }
  }, [firebase])

  // return state
  return { initializing, user }
}

/**
 * Hook that provides the store by its id.
 * @param {string} id - the id.
 * @returns {Object} { error, loading, store }.
 */
export const useStore = id => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [store, setStore] = useState(null)

  const firebase = useFirebase()

  useEffect(() => {
    if (firebase) {
      const unsubscribe = firebase.db
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
    }
  }, [firebase, id])

  return { error, loading, store }
}

/** Get the first part of the query depending on user and fav */
function userFavQuery (firebase, user, fav) {
  const uid = user ? user.uid : ''
  console.log(uid, fav)
  const collection = firebase.db.collection('stores')
  if (fav) return collection.where('fans', 'array-contains', uid)
  return collection.where('author', '==', uid)
}

/**
 * Hook that provides the stores for a user.
 * @param {Object} user - the user object.
 * @returns {Object} { error, loading, stores }.
 */
export const useMyStores = (user, fav = false) => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stores, setStores] = useState([])

  const firebase = useFirebase()

  useEffect(() => {
    if (firebase) {
      const unsubscribe = userFavQuery(firebase, user, fav)
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
    }
  }, [fav, firebase, user])

  return { error, loading, stores }
}
