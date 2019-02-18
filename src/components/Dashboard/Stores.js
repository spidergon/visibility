import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Seo from '../Seo'
import { useMyStores } from '../../lib/base'

const Wrapper = styled.div``

function Stores ({ fav, user, userLoading }) {
  const { loading, stores } = useMyStores(user)
  const [title, setTitle] = useState('')

  useEffect(() => {
    const nb = stores && stores.length ? ` (${stores.length})` : ``
    setTitle(fav ? `Mes Favoris${nb}` : `Mes Vitrines${nb}`)
  }, [stores])

  return (
    <Wrapper>
      <Seo title={title} />
      <center>
        <h2>{title}</h2>
        {(userLoading || loading) && <CircularProgress />}
      </center>
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
