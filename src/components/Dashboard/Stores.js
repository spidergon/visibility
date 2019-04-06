import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Seo from '../Seo'
import { useMyStores } from '../../lib/base'
import { setTabVal } from '../../lib/state'
import Card from '../Card'

const Wrapper = styled.div`
  .content {
    padding: 24px;
    text-align: center;
    text-align: -moz-center;
    text-align: -webkit-center;
  }
  .button {
    margin-top: 1em;
  }
`

function Stores ({ fav, user, userLoading }) {
  const [title, setTitle] = useState('')
  const { loading, stores } = useMyStores(user)

  useEffect(() => {
    const nb = stores && stores.length ? ` (${stores.length})` : ``
    setTitle(fav ? `Mes Favoris${nb}` : `Mes Vitrines${nb}`)
  }, [stores])

  return (
    <Wrapper>
      <Seo title={title} />
      <center>
        <h2>{title}</h2>
        {!loading && !userLoading && !fav && !stores.length && (
          <Button className="button" onClick={() => setTabVal(2)}>
            {'Ajouter une vitrine'}
          </Button>
        )}
        {(userLoading || loading) && <CircularProgress />}
      </center>
      <div className="content">
        <Grid container spacing={16}>
          {!userLoading &&
            user &&
            stores &&
            stores.map(store => (
              <Grid item key={store.id} lg={3} md={4} sm={6} xs={12}>
                <Card store={store} userId={user.uid} />
              </Grid>
            ))}
        </Grid>
      </div>
    </Wrapper>
  )
}

Stores.propTypes = {
  fav: PropTypes.bool,
  user: PropTypes.object,
  userLoading: PropTypes.bool
}

export default Stores
