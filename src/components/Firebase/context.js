import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import getFirebase from './firebase'

const FirebaseContext = React.createContext(null)

const FirebaseProvider = ({ children }) => {
  const [firebase, setFirebase] = useState(null)

  useEffect(() => {
    const app = import('firebase/app')
    const auth = import('firebase/auth')
    const db = import('firebase/firestore')
    const storage = import('firebase/storage')

    Promise.all([app, auth, db, storage]).then(values => {
      const newFirebase = getFirebase(values[0])
      setFirebase(newFirebase)
    })
  }, [])

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
}

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default FirebaseContext

export { FirebaseProvider }
