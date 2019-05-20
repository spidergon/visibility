import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Seo from '../Seo'
import { useMyStore } from '../../lib/base'
import { useSession } from '../../lib/user'
import Header from './Header'

const Wrapper = styled.div`
  padding-top: ${props => props.theme.headerHeight};
  .loading {
    margin-top: 2rem;
  }
`

function Store ({ storeId, edit }) {
  const { loading, store } = useMyStore(storeId)
  const { initializing, user } = useSession()

  useEffect(() => {
    if (store) console.log(store)
  }, [store])

  // TODO: Improve those effects

  useEffect(() => {
    // Can't edit if store doesn't exist or archived
    if ((loading === false && !store) || (store && store.archived)) {
      navigate('/')
    }
  }, [loading, store])

  useEffect(() => {
    // Can't edit if not authenticated user
    if (initializing === false && !user) {
      navigate(`/store/${storeId}`) // go back to store page
    }
  }, [storeId, initializing, user])

  useEffect(() => {
    // Can't edit if user is not the owner
    if (store && user && store.author !== user.uid) {
      navigate(`/store/${storeId}`) // go back to store page
    }
  }, [store, storeId, user])

  return (
    <Wrapper>
      <Helmet>
        <link
          crossOrigin=''
          href='https://unpkg.com/leaflet@1.4.0/dist/leaflet.css'
          integrity='sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=='
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
          <Header store={store} />
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
