import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from './Link'
import { useAuth } from './Firebase'
import { OffMenu, UserMenu } from './Menu'
import { $ } from '../lib/bling'
import useSiteMetadata from '../lib/useSiteMetadata'

const Wrapper = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  height: ${props => props.theme.headerHeight};
  line-height: ${props => props.theme.headerHeight};
  background-color: unset;
  transition: background-color 0.4s ease !important;
  z-index: 9;
  .content {
    grid-template-columns: auto 1fr auto;
    padding: 0 24px;
    nav {
      &.logo {
        height: ${props => props.theme.headerHeight};
        a {
          font-size: 24px;
          color: inherit;
        }
      }
      &.profile {
        ul {
          display: table;
          li {
            display: table-cell;
            a.link {
              display: inline-block;
              padding: 0 8px;
              color: #fff;
              .sub {
                height: ${props => props.theme.headerHeight};
                border-bottom: 2px solid transparent;
                &:hover {
                  border-bottom-color: #fff;
                }
                span {
                  padding: 8px;
                }
              }
            }
          }
        }
        img.avatar,
        .progress,
        .offline i {
          vertical-align: middle;
          cursor: pointer;
        }
        img.avatar {
          border-radius: 100%;
          width: 40px;
        }
        .offline {
          display: none;
          i {
            font-size: 24px;
          }
        }
      }
    }
  }
  &.opaque {
    background-color: #fff;
    border-bottom: ${props => props.theme.headerBottom};
    a.link {
      color: ${props => props.theme.black} !important;
      .sub:hover {
        border-bottom-color: ${props => props.theme.black} !important;
      }
    }
  }
  @media screen and (max-width: ${props => props.theme.sm}) {
    background-color: transparent !important;
    .profile {
      .link {
        display: none !important;
      }
      .offline {
        display: block !important;
      }
    }
  }
  @media (min-width: ${props => props.theme.sm}) {
    position: fixed;
  }
  @media (min-width: 1128px) {
    .content {
      padding-left: 32px;
      padding-right: 48px;
    }
  }
`

function Header ({ pathname }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [offMenuOpen, setOffMenuOpen] = useState(false)
  const [scrollDown, setScrollDown] = useState(false)

  const { initializing, user } = useAuth()
  const { title } = useSiteMetadata()

  const didCancel = useRef(false) // to block async state update when component has been unmounted

  useEffect(() => {
    if (pathname === '/') {
      let down = false
      window.addEventListener(
        'scroll',
        () => {
          if (!down && window.scrollY > 0) {
            down = true
            if (!didCancel.current) setScrollDown(true)
          } else if (down && window.scrollY === 0) {
            down = false
            if (!didCancel.current) setScrollDown(false)
          }
        },
        { passive: true }
      )
    }
    return () => (didCancel.current = true)
  }, [pathname])

  return (
    <Wrapper className={`${pathname !== '/' || scrollDown ? 'opaque' : ''}`}>
      <div className='content grid'>
        <nav className='logo'>
          <Link to='/'>
            <span>{title}</span>
          </Link>
        </nav>
        <nav className='navs' />
        <nav className='profile'>
          {pathname !== '/connexion' &&
            !initializing &&
            (!user || user.isAnonymous) && (
            <ul>
              <li>
                <Link className='link' to='/connexion'>
                  <div className='sub'>
                    <span>{'Connexion'}</span>
                  </div>
                </Link>
              </li>
            </ul>
          )}
          {initializing && !user && <CircularProgress className='progress' />}
          {!initializing && user && !user.isAnonymous && (
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
          {!initializing && !user && pathname !== '/connexion' && (
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
  pathname: PropTypes.string.isRequired
}

export default Header
