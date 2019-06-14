import { renderHook } from 'react-hooks-testing-library'
import useSiteMetadata from '../../lib/useSiteMetadata'

describe('Hook: useSiteMetadata', () => {
  it('returns the site metadata', () => {
    const { result } = renderHook(() => useSiteMetadata())
    expect(result).toMatchSnapshot()
  })
})
