import React from 'react'
import { render } from '../../lib/test-utils'
import Header from '../Header'

describe('<Header/>', () => {
  it('renders correctly', () => {
    const tree = render(<Header pathname='/' siteTitle='Visibility' />)
    expect(tree).toMatchSnapshot()
  })
})
