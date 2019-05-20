/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
/* eslint-disable react/prop-types */

import React from 'react'
import { GlobalStateProvider } from './src/lib/state'
import UserProvider from './src/components/UserProvider'

export const wrapRootElement = ({ element }) => (
  <GlobalStateProvider>
    <UserProvider>{element}</UserProvider>
  </GlobalStateProvider>
)

export const onClientEntry = () => {
  // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
  if (typeof window.IntersectionObserver === `undefined`) {
    import(`intersection-observer`)
    console.log(`# IntersectionObserver is polyfilled!`)
  }
}
