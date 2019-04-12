import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from './Link'
import { OffMenu, UserMenu } from './Menu'
import { HeaderTab } from './Dashboard/Tabs'
import { $ } from '../lib/bling'
import { dashPath } from '../lib/utils'
import useUser from '../lib/user'

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: ${props => props.theme.headerHeight};
  line-height: ${props => props.theme.headerHeight};
  color: rgba(0, 0, 0, 0.54);
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.28);
  z-index: 9;
  .content {
    display: grid;
    grid-template-columns: auto 1fr auto;
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
`

function Header ({ siteTitle }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [offMenuOpen, setOffMenuOpen] = useState(false)

  const { userLoading, user } = useUser()

  return (
    <Wrapper>
      <div className='inner wrap content'>
        <nav className='logo'>
          <Link to='/'>
            <span>{siteTitle}</span>
          </Link>
        </nav>
        <nav className='navs'>
          {window.location.pathname === dashPath && user && <HeaderTab />}
        </nav>
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
