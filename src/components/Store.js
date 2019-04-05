import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import Seo from '../components/Seo'
import { useMyStore } from '../lib/base'

const Wrapper = styled.div`
  .loading {
    margin-top: 2rem;
  }
`

function Store ({ storeId }) {
  const { loading, store } = useMyStore(storeId)

  useEffect(() => {
    console.log(loading, store)
    if (loading === false && !store) navigate('/')
  }, [loading, store])

  return (
    <Wrapper>
      {loading && (
        <center className="loading">
          <CircularProgress />
        </center>
      )}
      {!loading && store && (
        <>
          <Seo title={store.name} />
          <div>{store.name}</div>
        </>
      )}
    </Wrapper>
  )
}

Store.propTypes = {
  storeId: PropTypes.string
}

export default Store
