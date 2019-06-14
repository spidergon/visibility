import React from 'react'
import { render } from '../../lib/test-utils'
import Header from '../Dashboard/Header'

describe('<Header/>', () => {
  it('renders correctly', () => {
    const tree = render(<Header siteTitle='Visibility' />)
    expect(tree).toMatchSnapshot()
  })
})
