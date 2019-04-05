import React from 'react'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import { setTabVal } from '../lib/state'
import { dashPath } from '../lib/utils'

function goTo (to, hide, action) {
  if (hide) hide()
  if (action) action()
  navigate(to)
}

function OffMenu ({ anchor, hide, isOpen, user }) {
  return (
    <Menu anchorEl={anchor} id="off-menu" onClose={hide} open={isOpen}>
      <MenuItem onClick={() => goTo('/connexion')}>{'Connexion'}</MenuItem>
    </Menu>
  )
}

function UserMenu ({ anchor, hide, isOpen, user }) {
  return (
    <Menu anchorEl={anchor} id="user-menu" onClose={hide} open={isOpen}>
      <MenuItem onClick={() => goTo(dashPath, hide, () => setTabVal(3))}>
        {`${user.displayName ? `${user.displayName} ` : ''}${
          user.email ? `(${user.email})` : ''
        }`}
      </MenuItem>
      <Divider />
      {window.location.pathname !== dashPath && (
        <MenuItem onClick={() => goTo(dashPath, hide, () => setTabVal(0))}>
          {'Mon compte'}
        </MenuItem>
      )}
      <MenuItem onClick={() => goTo(dashPath, hide, () => setTabVal(2))}>
        {'Créer une Vitrine'}
      </MenuItem>
      <Divider />
      <MenuItem
        className="logout"
        onClick={() => {
          user.signOut()
          setTabVal(0)
          navigate('/')
        }}
      >
        {'Déconnexion'}
      </MenuItem>
    </Menu>
  )
}

OffMenu.propTypes = UserMenu.propTypes = {
  anchor: PropTypes.object,
  hide: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  user: PropTypes.object
}

export { OffMenu, UserMenu }
