import React from 'react'
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import Home from '../components/Home'

export default () => (
  <Layout>
    <Seo keywords={['gatsby', 'application', 'react']} title='Accueil' />
    <Home />
  </Layout>
)
