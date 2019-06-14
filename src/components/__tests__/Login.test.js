import React from 'react'
import { render } from '../../lib/test-utils'
import Login from '../Login'

describe('<Login/>', () => {
  it('renders correctly', () => {
    const tree = render(<Login />)
    expect(tree).toMatchSnapshot()
  })
})
