import React from 'react'
import styled from 'styled-components'
import MuiTabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import StoreIcon from '@material-ui/icons/Store'
import FavoriteIcon from '@material-ui/icons/Favorite'
import AddIcon from '@material-ui/icons/Add'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { useGlobalState, setTabVal } from '../../lib/state'

const Wrapper = styled.div`
  &.mobile {
    display: none;
    .mobileNavigation {
      position: fixed;
      width: 100%;
      border-top: 1px solid #dadce0;
      bottom: 0;
      z-index: 9999;
    }
  }
  @media screen and (max-width: 800px) {
    &.header {
      display: none;
    }
    &.mobile {
      display: block;
    }
  }
`

function HeaderTab () {
  const [{ tabVal }] = useGlobalState('dash')
  return (
    <Wrapper className="header">
      <MuiTabs
        centered
        indicatorColor="primary"
        onChange={(e, val) => setTabVal(val)}
        textColor="primary"
        value={tabVal}
      >
        <Tab label="Mes Vitrines" />
        <Tab label="Mes Favoris" />
        <Tab label="Créer une vitrine" />
        <Tab label="Mon Compte" />
      </MuiTabs>
    </Wrapper>
  )
}

function MobileTab () {
  const [{ tabVal }] = useGlobalState('dash')
  return (
    <Wrapper className="mobile">
      <BottomNavigation
        className={'mobileNavigation'}
        onChange={(e, val) => setTabVal(val)}
        value={tabVal}
      >
        <BottomNavigationAction
          icon={<StoreIcon />}
          label="Vitrines"
          value={0}
        />
        <BottomNavigationAction
          icon={<FavoriteIcon />}
          label="Favoris"
          value={1}
        />
        <BottomNavigationAction icon={<AddIcon />} label="Créer" value={2} />
        <BottomNavigationAction
          icon={<AccountCircleIcon />}
          label="Compte"
          value={3}
        />
      </BottomNavigation>
    </Wrapper>
  )
}

export { HeaderTab, MobileTab }
