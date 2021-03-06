import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Seo from '../Seo'
import { useMyStores } from '../Firebase'
import { setTabVal, showSnack } from '../../lib/state'
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

function Stores ({ fav, user, initializing }) {
  const [title, setTitle] = useState('')
  const { error, loading, stores } = useMyStores(user, fav)

  useEffect(() => {
    const nb = stores && stores.length ? ` (${stores.length})` : ``
    setTitle(fav ? `Mes Favoris${nb}` : `Mes Vitrines${nb}`)
  }, [fav, stores])

  useEffect(() => {
    if (error) {
      showSnack("Une erreur internet s'est produite", 'error')
      console.log(error)
      navigate('/')
    }
  }, [error])

  return (
    <Wrapper>
      <Seo title={title} />
      <center>
        <h2>{title}</h2>
        {!loading && !initializing && !fav && !stores.length && (
          <Button className='button' onClick={() => setTabVal(2)}>
            {'Ajouter une vitrine'}
          </Button>
        )}
        {(initializing || loading) && <CircularProgress />}
      </center>
      <div className='content'>
        <Grid container spacing={3}>
          {!initializing &&
            user &&
            !error &&
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
  initializing: PropTypes.bool
}

export default Stores
