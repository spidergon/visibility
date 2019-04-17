import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import CircularProgress from '@material-ui/core/CircularProgress'
import Seo from '../Seo'
import { useMyStore } from '../../lib/base'
import useUser from '../../lib/user'
import Map from '../Map'

const Wrapper = styled.div`
  padding-top: ${props => props.theme.headerHeight};
  .loading {
    margin-top: 2rem;
  }
  .map-wrapper {
    height: 250px;
  }
`

function Store ({ storeId, edit }) {
  const { loading, store } = useMyStore(storeId)
  const { userLoading, user } = useUser()

  useEffect(() => {
    if (store) console.log(store)
  }, [store])

  // TODO: Improve those effects

  useEffect(() => {
    // Can't edit if store doesn't exist or archived
    // console.log('Store', loading, store)
    if ((loading === false && !store) || (store && store.archived)) {
      navigate('/')
    }
  }, [loading, store])

  useEffect(() => {
    // Can't edit if not authenticated user
    // console.log('User', userLoading, user)
    if (userLoading === false && !user) {
      navigate(`/store/${storeId}`) // go back to store page
    }
  }, [storeId, userLoading, user])

  useEffect(() => {
    // Can't edit if user is not the owner
    // console.log('Store', loading, store)
    if (store && user && store.author !== user.uid) {
      navigate(`/store/${storeId}`) // go back to store page
    }
  }, [store, storeId, user])

  return (
    <Wrapper>
      {loading && (
        <center className='loading'>
          <CircularProgress />
        </center>
      )}
      {!loading && store && (
        <>
          <Seo title={`${store.name}${edit ? ' (Edition)' : ''}`} />
          <Helmet>
            <link
              crossOrigin=''
              href='https://unpkg.com/leaflet@1.3.4/dist/leaflet.css'
              integrity='sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=='
              rel='stylesheet'
            />
          </Helmet>
          <div className='map-wrapper'>
            <Map coordinates={store.coordinates} noLocate readOnly zoom={17} />
          </div>
          <div>{store.name}</div>
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
