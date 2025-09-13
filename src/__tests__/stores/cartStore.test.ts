import { useCartStore } from '@/stores/cartStore'
import { renderHook, act } from '@testing-library/react'

// Mock zustand persist
jest.mock('zustand/middleware', () => ({
  persist: (fn: any) => fn,
}))

const mockItem = {
  id: '1',
  name: 'Test Product',
  price: 1000,
  image: '/test-image.jpg',
  stock: 10
}

describe('CartStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useCartStore())
    act(() => {
      result.current.clearCart()
    })
  })

  it('initializes with empty cart', () => {
    const { result } = renderHook(() => useCartStore())
    
    expect(result.current.items).toEqual([])
    expect(result.current.total).toBe(0)
    expect(result.current.getTotalItems()).toBe(0)
  })

  it('adds item to cart', () => {
    const { result } = renderHook(() => useCartStore())
    
    act(() => {
      result.current.addItem(mockItem)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0]).toEqual({
      ...mockItem,
      quantity: 1
    })
    expect(result.current.total).toBe(1000)
    expect(result.current.getTotalItems()).toBe(1)
  })

  it('increases quantity when adding existing item', () => {
    const { result } = renderHook(() => useCartStore())
    
    act(() => {
      result.current.addItem(mockItem)
      result.current.addItem(mockItem)
    })

    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.total).toBe(2000)
    expect(result.current.getTotalItems()).toBe(2)
  })

  it('respects stock limit when adding items', () => {
    const { result } = renderHook(() => useCartStore())
    const limitedStockItem = { ...mockItem, stock: 2 }
    
    act(() => {
      result.current.addItem(limitedStockItem)
      result.current.addItem(limitedStockItem)
      result.current.addItem(limitedStockItem) // This should not increase quantity
    })

    expect(result.current.items[0].quantity).toBe(2)
    expect(result.current.total).toBe(2000)
  })

  it('updates item quantity', () => {
    const { result } = renderHook(() => useCartStore())
    
    act(() => {
      result.current.addItem(mockItem)
      result.current.updateQuantity('1', 3)
    })

    expect(result.current.items[0].quantity).toBe(3)
    expect(result.current.total).toBe(3000)
    expect(result.current.getTotalItems()).toBe(3)
  })

  it('removes item when quantity is updated to 0 or less', () => {
    const { result } = renderHook(() => useCartStore())
    
    act(() => {
      result.current.addItem(mockItem)
      result.current.updateQuantity('1', 0)
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.total).toBe(0)
    expect(result.current.getTotalItems()).toBe(0)
  })

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCartStore())
    
    act(() => {
      result.current.addItem(mockItem)
      result.current.removeItem('1')
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.total).toBe(0)
    expect(result.current.getTotalItems()).toBe(0)
  })

  it('clears entire cart', () => {
    const { result } = renderHook(() => useCartStore())
    
    act(() => {
      result.current.addItem(mockItem)
      result.current.addItem({ ...mockItem, id: '2' })
      result.current.clearCart()
    })

    expect(result.current.items).toHaveLength(0)
    expect(result.current.total).toBe(0)
    expect(result.current.getTotalItems()).toBe(0)
  })

  it('calculates total correctly with multiple items', () => {
    const { result } = renderHook(() => useCartStore())
    const item2 = { ...mockItem, id: '2', price: 2000 }
    
    act(() => {
      result.current.addItem(mockItem) // 1000
      result.current.addItem(item2)    // 2000
      result.current.updateQuantity('1', 2) // 1000 * 2 = 2000
    })

    expect(result.current.total).toBe(4000) // 2000 + 2000
    expect(result.current.getTotalItems()).toBe(3) // 2 + 1
  })
})