import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import { useSession } from '../../lib/user'
import { useGlobalState, showSnack } from '../../lib/state'
import Stores from './Stores'
import AddStore from './AddStore'
import Account from './Account'
import { MobileTab } from './Tabs'

const Wrapper = styled.div`
  padding-top: 2rem;
  @media (max-width: 800px) {
    margin-bottom: 5rem;
  }
`

function Dash () {
  const { initializing, user } = useSession()
  const [{ tabVal }] = useGlobalState('dash')

  useEffect(() => {
    if (!initializing && !user) {
      showSnack('Connexion requise !', 'error')
      navigate('/connexion')
    }
  }, [initializing, user])

  const Page = () => {
    switch (tabVal) {
      case 0:
        return <Stores initializing={initializing} user={user} />
      case 1:
        return <Stores fav initializing={initializing} user={user} />
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
