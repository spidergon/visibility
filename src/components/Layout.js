import React from 'react'
// import { setConfig } from 'react-hot-loader'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from './Style'
import { GlobalStateProvider } from '../lib/state'
import Header from './Header'
import DashHeader from './Dashboard/Header'
import Snack from './Snack'
import { dashPath } from '../lib/utils'
import '../lib/cookieconsent'
// setConfig({ pureSFC: true })

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <GlobalStateProvider>
          <Helmet>
            <link
              href='//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.css'
              rel='stylesheet'
              type='text/css'
            />
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
          <GlobalStyle />
          <Snack />
          {(window.location.pathname === dashPath && (
            <DashHeader siteTitle={data.site.siteMetadata.title} />
          )) || <Header siteTitle={data.site.siteMetadata.title} />}
          <main>{children}</main>
        </GlobalStateProvider>
      )}
    />
  </ThemeProvider>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
