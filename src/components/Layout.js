import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { ThemeProvider } from 'styled-components'
import { theme, Style } from './Style'
import Header from './Header'
import DashHeader from './Dashboard/Header'
import Snack from './Snack'
import { dashPath } from '../lib/utils'
import '../lib/cookieconsent'

const Layout = ({ children, location: { pathname } }) => (
  <ThemeProvider theme={theme}>
    <>
      <Helmet>
        <link
          crossOrigin='anonymous'
          href='https://use.fontawesome.com/releases/v5.6.1/css/all.css'
          integrity='sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP'
          rel='stylesheet'
        />
        <link
          href='https://fonts.googleapis.com/css?family=Roboto'
          rel='stylesheet'
        />
      </Helmet>
      <Style />
      <Snack />
      {(pathname === dashPath && <DashHeader />) || (
        <Header pathname={pathname} />
      )}
      <main>{children}</main>
    </>
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired
}

export default Layout
