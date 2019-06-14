import React from 'react'
import { render } from '../../lib/test-utils'
import Link from '../Link'

describe('<Links/>', () => {
  it('renders "internal" links correctly', () => {
    const { container } = render(<Link to='/'>{'My Link'}</Link>)
    expect(container).toMatchSnapshot()
  })

  it('renders "internal file" links correctly', () => {
    const { container } = render(<Link to='/test.pdf'>{'My Link'}</Link>)
    expect(container).toMatchSnapshot()
  })

  it('renders "external" links correctly', () => {
    const { container } = render(
      <Link blank to='https://www.google.com'>
        {'My Link'}
      </Link>
    )
    expect(container).toMatchSnapshot()
  })
})
