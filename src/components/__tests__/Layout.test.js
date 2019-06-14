import React from 'react'
import { render as r } from '../../lib/test-utils'
import { StaticQuery } from 'gatsby' // mocked

import Layout from '../Layout'

beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      site: {
        siteMetadata: {
          title: `Visibility`
        }
      }
    })
  )
})

describe('<Layout/>', () => {
  it('renders correctly', () => {
    const tree = r(
      <Layout location={{ pathname: '/' }}>
        <h1>{'Hey!'}</h1>
      </Layout>
    )
    expect(tree).toMatchSnapshot()
  })
})
