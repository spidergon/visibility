import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import useUser from '../../lib/user'
import { useGlobalState, showSnack } from '../../lib/state'
import Stores from './Stores'
import AddStore from './AddStore'
import Account from './Account'
import { MobileTab } from './Tabs'

const Wrapper = styled.div`
  margin-top: 1rem;
  @media (max-width: 800px) {
    margin-bottom: 5rem;
  }
`

function Dash () {
  const { userLoading, user } = useUser()
  const [{ tabVal }] = useGlobalState('dash')

  useEffect(() => {
    if (!userLoading && !user) {
      showSnack('Connexion requise !', 'error')
      navigate('/connexion')
    }
  }, [userLoading, user])

  const Page = () => {
    switch (tabVal) {
      case 0:
        return <Stores user={user} userLoading={userLoading} />
      case 1:
        return <Stores fav />
      case 2:
        return <AddStore />
      case 3:
        return <Account />
    }
  }

  return (
    <Wrapper className='inner'>
      <Page />
      <MobileTab />
    </Wrapper>
  )
}

export default Dash
