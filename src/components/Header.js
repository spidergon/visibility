import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from './Link'
import { OffMenu, UserMenu } from './Menu'
import { $ } from '../lib/bling'
import useUser from '../lib/user'

const Wrapper = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${props => props.theme.headerHeight};
  background-color: unset;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.28); */
  border-bottom: 1px solid rgba(151, 151, 151, 0.2) !important;
  z-index: 9;
  .content {
    grid-template-columns: auto 1fr auto;
    padding: 0 24px;
  }
  nav {
    &.logo a {
      font-size: 24px;
      color: inherit;
    }
    &.profile {
      a.link {
        text-transform: uppercase;
      }
      img.avatar {
        border-radius: 100%;
        vertical-align: middle;
        cursor: pointer;
        width: 40px;
      }
      .offline {
        display: none;
        i {
          font-size: 24px;
          vertical-align: middle;
        }
      }
      .progress {
        width: 40px;
        margin-top: 3px;
      }
    }
  }
  @media screen and (max-width: ${props => props.theme.sm}) {
    nav {
      &.profile {
        .link {
          display: none;
        }
        .offline {
          display: block;
        }
      }
    }
  }
  @media (min-width: 744px) {
    position: fixed;
  }
  @media (min-width: 1128px) {
    .content {
      padding-left: 32px;
      padding-right: 48px;
    }
  }
`

function Header ({ siteTitle }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [offMenuOpen, setOffMenuOpen] = useState(false)
  const { userLoading, user } = useUser()

  return (
    <Wrapper>
      <div className='content grid'>
        <nav className='logo'>
          <Link to='/'>
            <span>{siteTitle}</span>
          </Link>
        </nav>
        <nav className='navs' />
        <nav className='profile'>
          {window.location.pathname !== '/connexion' &&
            !userLoading &&
            (!user || user.isAnonymous) && (
            <Link className='link' to='/connexion'>
              {'Connexion'}
            </Link>
          )}
          {userLoading && !user && <CircularProgress className='progress' />}
          {!userLoading && user && !user.isAnonymous && (
            <>
              <img
                alt='Profile'
                className='avatar'
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                src={user.photoURL}
              />
              <UserMenu
                anchor={$('.avatar')}
                hide={() => setUserMenuOpen(false)}
                isOpen={userMenuOpen}
                user={user}
              />
            </>
          )}
          {!userLoading && !user && window.location.pathname !== '/connexion' && (
            <div className='offline'>
              <span
                className='menu-anchor'
                onClick={() => setOffMenuOpen(!offMenuOpen)}
              >
                <i className='fas fa-bars' />
              </span>
              <OffMenu
                anchor={$('.menu-anchor')}
                hide={() => setOffMenuOpen(false)}
                isOpen={offMenuOpen}
                user={user}
              />
            </div>
          )}
        </nav>
      </div>
    </Wrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired
}

export default Header
