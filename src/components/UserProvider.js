// import React, { createContext, useEffect, useState } from 'react'
// import PropTypes from 'prop-types'
// import md5 from 'md5'
// import { auth, addUser } from '../lib/base'

// export const UserContext = createContext({ user: null })

// const useAuth = () => {
//   const [state, setState] = useState(() => {
//     const user = auth.currentUser
//     return { initializing: !user, user }
//   })

//   useEffect(() => {
//     // listen for auth state changes
//     const unsubscribe = auth.onAuthStateChanged(user => {
//       let formattedUser = null
//       if (user) {
//         // Add user into the database
//         addUser({
//           uid: user.uid,
//           created: new Date(),
//           admin: false
//         })
//         formattedUser = {
//           uid: user.uid,
//           isAnonymous: user.isAnonymous,
//           emailVerified: user.emailVerified,
//           displayName: user.displayName,
//           email: user.email,
//           photoURL: user.photoURL
//             ? user.photoURL
//             : user.email
//               ? `https://gravatar.com/avatar/${md5(user.email)}?s=50`
//               : null,
//           signOut: () => auth.signOut()
//         }
//       }
//       setState({ initializing: false, user: formattedUser })
//     })
//     // unsubscribe to the listener when unmounting
//     return () => unsubscribe()
//   }, [])

//   return state
// }

// function UserProvider ({ children }) {
//   const { initializing, user } = useAuth()
//   return (
//     <UserContext.Provider value={{ initializing, user }}>
//       {children}
//     </UserContext.Provider>
//   )
// }

// UserProvider.propTypes = {
//   children: PropTypes.node.isRequired
// }

// export default UserProvider
