import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Seo from '../components/Seo'
import { useMyStore } from '../lib/base'
import useUser from '../lib/user'

const Wrapper = styled.div`
  .loading {
    margin-top: 2rem;
  }
`

function Store ({ storeId, edit }) {
  const { loading, store } = useMyStore(storeId)
  const { userLoading, user } = useUser()

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
  }, [userLoading, user])

  useEffect(() => {
    // Can't edit if user is not the owner
    // console.log('Store', loading, store)
    if (store && user && store.author !== user.uid) {
      navigate(`/store/${storeId}`) // go back to store page
    }
  }, [store, user])

  return (
    <Wrapper>
      {loading && (
        <center className="loading">
          <CircularProgress />
        </center>
      )}
      {!loading && store && (
        <>
          <Seo title={`${store.name}${edit ? ' (Edition)' : ''}`} />
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
