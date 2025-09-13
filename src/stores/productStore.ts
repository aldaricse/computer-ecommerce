import { create } from 'zustand'

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  category: string
  brand?: string
  stock: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

interface ProductState {
  products: Product[]
  loading: boolean
  error: string | null
  filters: {
    category?: string
    priceRange?: [number, number]
    brand?: string
    search?: string
  }
  setProducts: (products: Product[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilters: (filters: Partial<ProductState['filters']>) => void
  resetFilters: () => void
  getFilteredProducts: () => Product[]
}

const initialFilters = {
  category: '',
  priceRange: [0, 10000] as [number, number],
  brand: '',
  search: ''
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  filters: initialFilters,
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setFilters: (newFilters) => 
    set((state) => ({ 
      filters: { ...state.filters, ...newFilters } 
    })),
  resetFilters: () => set({ filters: initialFilters }),
  getFilteredProducts: () => {
    const { products, filters } = get()
    if(filters.category === "" && filters.brand ==="" && filters.search === "") {
      return products.filter(product => product.isActive)
    }

    return products.filter(product => {
      const matchesCategory = !filters.category || product.category === filters.category
      const matchesBrand = !filters.brand || product.brand === filters.brand
      const matchesPrice = !!filters.priceRange && product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
      const matchesSearch = !filters.search || 
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description?.toLowerCase().includes(filters.search.toLowerCase())
      
      return matchesCategory && matchesBrand && matchesPrice && matchesSearch && product.isActive
    })
  }
}))