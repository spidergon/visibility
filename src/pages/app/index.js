import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { Router } from '@reach/router'
import Layout from '../../components/Layout'
import Dash from '../../components/Dashboard'

const Index = () => {
  useEffect(() => navigate('/'), [])
  return ''
}

export default () => (
  <Layout>
    <Router>
      <Index path='/app' />
      <Dash path='/app/dashboard' />
    </Router>
  </Layout>
)
