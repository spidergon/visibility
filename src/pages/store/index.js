import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { Router } from '@reach/router'
import Layout from '../../components/Layout'
import Store from '../../components/Store'

const Index = () => {
  useEffect(() => navigate('/'), [])
  return ''
}

export default () => (
  <Layout>
    <Router>
      <Index path='/store' />
      <Store path='/store/:storeId' />
      <Store edit path='/store/:storeId/edit' />
    </Router>
  </Layout>
)
