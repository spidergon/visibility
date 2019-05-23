import { renderHook } from 'react-hooks-testing-library'
import { useSession } from '../../lib/user'

describe('useSession hook', () => {
  it('should not get user', () => {
    const { result } = renderHook(() => useSession())
    expect(result.current.initializing).toBe(undefined)
    expect(result.current.user).toBe(null)
  })
})
