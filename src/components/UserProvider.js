import React, { createContext } from 'react'
import PropTypes from 'prop-types'
import { useAuth } from '../lib/user'

export const UserContext = createContext({ user: null })

function UserProvider ({ children }) {
  const { initializing, user } = useAuth()
  return (
    <UserContext.Provider value={{ initializing, user }}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default UserProvider
