import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Seo from '../Seo'
import { useMyStores } from '../../lib/base'

const Wrapper = styled.div``

function Stores ({ fav, user, userLoading }) {
  const { loading, stores } = useMyStores(user)

  return (
    <Wrapper>
      <Seo title={fav ? 'Mes Favoris' : 'Mes Vitrines'} />
      <p>{'Mes Vitrines'}</p>
      {(userLoading || loading) && <p>{'Loading...'}</p>}
      {stores && stores.map(store => <div key={store.id}>{store.id}</div>)}
    </Wrapper>
  )
}

Stores.propTypes = {
  fav: PropTypes.bool,
  user: PropTypes.object,
  userLoading: PropTypes.bool
}

export default Stores
