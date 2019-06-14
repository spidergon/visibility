import React, { useState } from 'react'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '../Link'
import { UserMenu } from '../Menu'
import { HeaderTab } from './Tabs'
import { $ } from '../../lib/bling'
import useSiteMetadata from '../../lib/useSiteMetadata'
import { useAuth } from '../Firebase'

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  height: ${props => props.theme.dashHeaderHeight};
  line-height: ${props => props.theme.dashHeaderHeight};
  background-color: #fff;
  border-bottom: ${props => props.theme.headerBottom};
  z-index: 9;
  .content {
    grid-template-columns: auto 1fr auto;
    padding: 0 24px;
  }
  nav {
    &.logo {
      height: ${props => props.theme.dashHeaderHeight};
      a {
        font-size: 24px;
        color: inherit;
      }
    }
    &.profile {
      img.avatar {
        border-radius: 100%;
        vertical-align: middle;
        cursor: pointer;
        width: 40px;
      }
      .progress {
        width: 40px;
        margin-top: 3px;
      }
    }
  }
  @media (min-width: 1128px) {
    .content {
      padding-left: 32px;
      padding-right: 48px;
    }
  }
`

function Header () {
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const { title } = useSiteMetadata()
  const { initializing, user } = useAuth()

  return (
    <Wrapper>
      <div className='content grid'>
        <nav className='logo'>
          <Link to='/'>
            <span>{title}</span>
          </Link>
        </nav>
        <nav className='navs'>{user && <HeaderTab />}</nav>
        <nav className='profile'>
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
        </nav>
      </div>
    </Wrapper>
  )
}

export default Header
