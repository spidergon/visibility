import { useContext, useEffect, useState } from 'react'
import FirebaseContext from './context'

export const useFirebase = () => useContext(FirebaseContext)

export const useAuth = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  const firebase = useFirebase()

  useEffect(() => {
    setInitializing(!user)
  }, [user])

  useEffect(() => {
    if (firebase) {
      // listen for auth state changes
      const unsubscribe = firebase.onAuthUserListener(
        authUser => setUser(authUser), // on success
        () => {
          setUser(null)
          setInitializing(false)
        }
      )
      // unsubscribe to the listener when unmounting
      return () => unsubscribe()
    }
  }, [firebase])

  // return state
  return { initializing, user }
}

/** Get the first part of the query depending on user and fav */
function userFavQuery (firebase, user, fav) {
  const uid = user ? user.uid : ''
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
