import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { Router } from '@reach/router'
import Store from '../../components/Store'

const Index = () => {
  useEffect(() => navigate('/'), [])
  return ''
}

export default () => (
  <Router>
    <Index path='/store' />
    <Store path='/store/:storeId' />
    <Store edit path='/store/:storeId/edit' />
  </Router>
)
