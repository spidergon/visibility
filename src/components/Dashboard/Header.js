import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Link from '../Link'
import { UserMenu } from '../Menu'
import { HeaderTab } from './Tabs'
import { $ } from '../../lib/bling'
import useUser from '../../lib/user'

const Wrapper = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  line-height: ${props => props.theme.dashHeaderHeight};
  background-color: #fff;
  border-bottom: 1px solid rgba(151, 151, 151, 0.2) !important;
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
  const { userLoading, user } = useUser()

  return (
    <Wrapper>
      <div className='content grid'>
        <nav className='logo'>
          <Link to='/'>
            <span>{siteTitle}</span>
          </Link>
        </nav>
        <nav className='navs'>{user && <HeaderTab />}</nav>
        <nav className='profile'>
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
        </nav>
      </div>
    </Wrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired
}

export default Header
