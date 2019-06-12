import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import { Router } from '@reach/router'
import Dash from '../../components/Dashboard'

const Index = () => {
  useEffect(() => navigate('/'), [])
  return ''
}

export default () => (
  <Router>
    <Index path='/app' />
    <Dash path='/app/dashboard' />
  </Router>
)
