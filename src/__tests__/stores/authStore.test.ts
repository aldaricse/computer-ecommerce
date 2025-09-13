import { useAuthStore } from '@/stores/authStore'
import { renderHook, act } from '@testing-library/react'

// Mock zustand persist
jest.mock('zustand/middleware', () => ({
  persist: (fn: any) => fn,
}))

const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com'
}

const mockToken = 'test-token-123'

describe('AuthStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useAuthStore())
    act(() => {
      result.current.logout()
    })
  })

  it('initializes with no user authenticated', () => {
    const { result } = renderHook(() => useAuthStore())
    
    expect(result.current.user).toBeNull()
    expect(result.current.token).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('logs in user successfully', () => {
    const { result } = renderHook(() => useAuthStore())
    
    act(() => {
      result.current.login(mockUser, mockToken)
    })

    expect(result.current.user).toEqual(mockUser)
    expect(result.current.token).toBe(mockToken)
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('logs out user successfully', () => {
    const { result } = renderHook(() => useAuthStore())
    
    act(() => {
      result.current.login(mockUser, mockToken)
      result.current.logout()
    })

    expect(result.current.user).toBeNull()
    expect(result.current.token).toBeNull()
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('updates user information', () => {
    const { result } = renderHook(() => useAuthStore())
    
    act(() => {
      result.current.login(mockUser, mockToken)
    })

    const updatedUser = { ...mockUser, name: 'Updated Name' }
    
    act(() => {
      result.current.setUser(updatedUser)
    })

    expect(result.current.user).toEqual(updatedUser)
    expect(result.current.token).toBe(mockToken) // Token should remain the same
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('maintains authentication state after user update', () => {
    const { result } = renderHook(() => useAuthStore())
    
    act(() => {
      result.current.login(mockUser, mockToken)
    })

    const updatedUser = { ...mockUser, email: 'updated@example.com' }
    
    act(() => {
      result.current.setUser(updatedUser)
    })

    expect(result.current.isAuthenticated).toBe(true)
    expect(result.current.user?.email).toBe('updated@example.com')
  })
})