import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product } from '@/types/product'

interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  lastProductId: string | null
  clearLastProductId: () => void
  addItem: (product: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      lastProductId: null,
      clearLastProductId: () => set({ lastProductId: null }),
      addItem: (product) => {
        const items = get().items
        const existingItem = items.find(item => item.id === product.id)
        
        if (existingItem) {
          const newQuantity = Math.min(existingItem.quantity + 1, product.stock)
          set((state) => ({
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: newQuantity }
                : item
            ),
            total: state.items.reduce((sum, item) => 
              item.id === product.id 
                ? sum + (item.price * newQuantity)
                : sum + (item.price * item.quantity), 0)
          }))
        } else {
          const newItem = { ...product, quantity: 1 }
          set((state) => ({
            items: [...state.items, newItem],
            total: state.total + product.price
          }))
        }

        set({ lastProductId: product.id })
      },
      removeItem: (id) => {
        set((state) => {
          const newItems = state.items.filter(item => item.id !== id)
          return {
            items: newItems,
            total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          }
        })
      },
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        set((state) => {
          const newItems = state.items.map(item => {
            if (item.id === id) {
              const newQuantity = Math.min(quantity, item.stock)
              return { ...item, quantity: newQuantity }
            }
            return item
          })
          return {
            items: newItems,
            total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
          }
        })
      },
      clearCart: () => set({ items: [], total: 0 }),
      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
      getTotalPrice: () => {
        return get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'cart-storage'
    }
  )
)