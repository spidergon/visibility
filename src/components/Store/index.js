import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Seo from '../Seo'
import { showSnack } from '../../lib/state'
import Header from './Header'
import Description from './Description'
import Showcase from './Showcase'
import { useAuth, useStore } from '../Firebase'

const Wrapper = styled.div`
  padding-top: ${props => props.theme.headerHeight};
  .loading {
    margin-top: 2rem;
  }
  .presentation {
    grid-template-columns: 1fr auto;
    margin-top: 30px;
  }
`

function Store ({ storeId, edit }) {
  const { error, loading, store } = useStore(storeId)
  const { initializing, user } = useAuth()

  useEffect(() => {
    if (store) console.log(store)
  }, [store])

  useEffect(() => {
    // Can't see store if it doesn't exist or is archived
    if ((loading === false && !store) || (store && store.archived)) {
      navigate('/')
    }
  }, [loading, store])

  useEffect(() => {
    // Can't edit if not authenticated user
    if (edit && initializing === false && !user) {
      navigate(`/store/${storeId}`) // go back to store page
    }
  }, [edit, initializing, storeId, user])

  useEffect(() => {
    // Can't edit if user is not the owner
    if (edit && store && user && store.author !== user.uid) {
      navigate(`/store/${storeId}`) // go back to store page
    }
  }, [edit, store, storeId, user])

  useEffect(() => {
    if (error) {
      showSnack("Une erreur internet s'est produite", 'error')
      console.log(error)
      navigate('/')
    }
  }, [error])

  return (
    <Wrapper>
      <Helmet>
        <link
          crossOrigin=''
          href='https://unpkg.com/leaflet@1.5.1/dist/leaflet.css'
          integrity='sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=='
          rel='stylesheet'
        />
      </Helmet>
      {loading && (
        <center className='loading'>
          <CircularProgress />
        </center>
      )}
      {!loading && store && (
        <>
          <Seo title={`${store.name}${edit ? ' (Edition)' : ''}`} />
          <Header store={store} user={user} />
          <section className='inner wrap grid presentation'>
            <Description store={store} />
            <Showcase store={store} />
          </section>
        </>
      )}
      {edit && <p>{'EDIT'}</p>}
    </Wrapper>
  )
}

Store.propTypes = {
  storeId: PropTypes.string,
  edit: PropTypes.bool
}

export default Store
