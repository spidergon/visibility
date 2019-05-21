import React from 'react'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Divider from '@material-ui/core/Divider'
import { setTabVal } from '../lib/state'
import { dashPath } from '../lib/utils'

function goToDash (hide, action) {
  if (hide) hide()
  if (action) action()
  navigate(dashPath)
}

const LogoutMenuItem = ({ signOut }) => (
  <MenuItem
    className='logout'
    onClick={() => {
      signOut()
      setTabVal(0)
      navigate('/')
    }}
  >
    {'Déconnexion'}
  </MenuItem>
)

const UserMenu = ({ anchor, hide, isOpen, user }) => (
  <>
    {(window.location.pathname !== dashPath && (
      <Menu anchorEl={anchor} id='user-menu' onClose={hide} open={isOpen}>
        <MenuItem onClick={() => goToDash(hide, () => setTabVal(3))}>
          {`${user.displayName ? `${user.displayName} ` : ''}${
            user.email ? `(${user.email})` : ''
          }`}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => goToDash(hide, () => setTabVal(0))}>
          {'Tableau de bord'}
        </MenuItem>
        <MenuItem onClick={() => goToDash(hide, () => setTabVal(1))}>
          {'Mes favoris'}
        </MenuItem>
        <MenuItem onClick={() => goToDash(hide, () => setTabVal(2))}>
          {'Créer une Vitrine'}
        </MenuItem>
        <Divider />
        <LogoutMenuItem signOut={() => user.signOut()} />
      </Menu>
    )) || (
      <Menu anchorEl={anchor} id='user-menu' onClose={hide} open={isOpen}>
        <MenuItem onClick={() => navigate('/')}>{'Accueil'}</MenuItem>
        <LogoutMenuItem signOut={() => user.signOut()} />
      </Menu>
    )}
  </>
)

const OffMenu = ({ anchor, hide, isOpen, user }) => (
  <Menu anchorEl={anchor} id='off-menu' onClose={hide} open={isOpen}>
    <MenuItem onClick={() => navigate('/connexion')}>{'Connexion'}</MenuItem>
  </Menu>
)

LogoutMenuItem.propTypes = {
  signOut: PropTypes.func.isRequired
}

UserMenu.propTypes = OffMenu.propTypes = {
  anchor: PropTypes.object,
  hide: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  user: PropTypes.object
}

export { UserMenu, OffMenu }
