import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { signOut } from '../lib/user'
import { setTabVal } from '../lib/state'
import { $ } from '../lib/bling'

const Wrapper = styled.ul`
  position: absolute;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  border-radius: 4px;
  top: calc(${props => props.theme.headerHeight} + 16px);
  padding: 8px 0;
  list-style: none;
  visibility: hidden;
  text-align: left;
  &.visible {
    visibility: visible;
  }
  hr {
    height: 1px;
    margin: 0;
    border: none;
    background-color: rgba(0, 0, 0, 0.12);
  }
  li {
    height: 3rem;
    line-height: 3rem;
    font-weight: 400;
    white-space: nowrap;
    padding: 0 16px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  &:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    right: 20px;
    top: -14px;
    border-bottom-color: #fff;
    border-top-width: 0;
    z-index: 2;
  }
`

function resizeEffect (menu, anchor) {
  console.log('anchor:', menu, anchor)
  function resizeHandle () {
    if (anchor) {
      const anchorRect = anchor.getBoundingClientRect()
      menu.style.left = `${anchorRect.left +
        anchorRect.width -
        menu.offsetWidth +
        15}px`
    }
  }
  resizeHandle()
  return () => {
    window.addEventListener('resize', resizeHandle)
    return () => window.removeEventListener('resize', resizeHandle)
  }
}

function hideMenuEffect (menu, anchor, hide) {
  function hideHandleClick (e) {
    if (
      anchor &&
      menu &&
      anchor !== e.target &&
      !anchor.contains(e.target) &&
      menu !== e.target &&
      !menu.contains(e.target)
    ) {
      hide()
    }
  }
  return () => {
    document.addEventListener('click', hideHandleClick) // Add event on click to hide menu
    return () => document.removeEventListener('click', hideHandleClick) // Cleaning effect
  }
}

function goTo (to, hide, action) {
  if (hide) hide()
  if (action) action()
  navigate(to)
}

function logOut () {
  signOut()
  setTabVal(0)
  navigate('/')
}

function OffMenu ({ anchor, hide, isOpen, user }) {
  const menu = $('.offmenu')
  useEffect(resizeEffect(menu, anchor), [anchor])
  useEffect(hideMenuEffect(menu, anchor, hide), [anchor])

  return (
    <Wrapper className={isOpen ? 'offmenu visible' : 'offmenu'}>
      {user && !user.isAnonymous ? (
        <>
          <li onClick={() => goTo('/dashboard', hide, () => setTabVal(3))}>{`${
            user.displayName ? `${user.displayName} ` : ''
          }${user.email ? `(${user.email})` : ''}`}</li>
          <hr />
          {window.location.pathname !== '/dashboard' && (
            <li onClick={() => goTo('/dashboard', hide, () => setTabVal(0))}>
              {'Mon compte'}
            </li>
          )}
          <li onClick={() => goTo('/dashboard', hide, () => setTabVal(2))}>
            {'Créer une Vitrine'}
          </li>
          <hr />
          <li className="logout" onClick={logOut}>
            {'Déconnexion'}
          </li>
        </>
      ) : (
        <>
          {window.location.pathname !== '/connexion' && (
            <li onClick={() => goTo('/connexion')}>{'Connexion'}</li>
          )}
        </>
      )}
    </Wrapper>
  )
}

function UserMenu ({ anchor, hide, isOpen, user }) {
  const menu = $('.usermenu')
  useEffect(resizeEffect(menu, anchor), [anchor])
  useEffect(hideMenuEffect(menu, anchor, hide), [anchor])

  return (
    <Wrapper className={isOpen ? 'usermenu visible' : 'usermenu'}>
      <li onClick={() => goTo('/dashboard', hide, () => setTabVal(3))}>{`${
        user.displayName ? `${user.displayName} ` : ''
      }${user.email ? `(${user.email})` : ''}`}</li>
      <hr />
      {window.location.pathname !== '/dashboard' && (
        <li onClick={() => goTo('/dashboard', hide, () => setTabVal(0))}>
          {'Mon compte'}
        </li>
      )}
      <li onClick={() => goTo('/dashboard', hide, () => setTabVal(2))}>
        {'Créer une Vitrine'}
      </li>
      <hr />
      <li className="logout" onClick={logOut}>
        {'Déconnexion'}
      </li>
    </Wrapper>
  )
}

OffMenu.propTypes = UserMenu.propTypes = {
  anchor: PropTypes.object,
  hide: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  user: PropTypes.object
}

export { OffMenu, UserMenu }
