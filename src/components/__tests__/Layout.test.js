import React from 'react'
import renderer from 'react-test-renderer'
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
    const tree = renderer
      .create(
        <Layout>
          <h1>{'Hey!'}</h1>
        </Layout>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
