import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ProductCard from '@/components/products/ProductCard'
import { useCartStore } from '@/stores/cartStore'
import { useAuthStore } from '@/stores/authStore'

const useCartStoreMock = useCartStore as unknown as jest.Mock
const useAuthStoreMock = useAuthStore as unknown as jest.Mock

// Mock the stores
jest.mock('../../stores/cartStore')
jest.mock('../../stores/authStore')

const mockProduct = {
  id: '1',
  name: 'Test Product',
  description: 'Test description',
  price: 1000,
  image: '/test-image.jpg',
  category: 'test',
  brand: 'Test Brand',
  stock: 10,
  isActive: true
}

const mockAddItem = jest.fn()
const mockPush = jest.fn()

// Add this mock before the other mocks
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Remove fill from props since we don't need it in the test
    const { fill, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} alt={props.alt} />
  },
}))

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('ProductCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useCartStoreMock.mockReturnValue({
      addItem: mockAddItem,
    })
  })

  it('renders product information correctly', () => {
    useAuthStoreMock.mockReturnValue({
      isAuthenticated: true,
    })

    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Test Brand')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('Stock: 10')).toBeInTheDocument()
  })

  it('adds item to cart when authenticated user clicks add button', () => {
    useAuthStoreMock.mockReturnValue({
      isAuthenticated: true,
    })

    render(<ProductCard product={mockProduct} />)

    const addButton = screen.getByText('Agregar')
    fireEvent.click(addButton)

    expect(mockAddItem).toHaveBeenCalledWith({
      id: '1',
      name: 'Test Product',
      price: 1000,
      image: '/test-image.jpg',
      stock: 10,
      category: 'test',
      isActive: true,
      updatedAt: undefined,
      createdAt: undefined
    })
  })

  it('redirects to login when unauthenticated user clicks add button', () => {
    useAuthStoreMock.mockReturnValue({
      isAuthenticated: false,
    })

    render(<ProductCard product={mockProduct} />)

    const addButton = screen.getByText('Agregar')
    fireEvent.click(addButton)

    expect(mockPush).toHaveBeenCalledWith('/auth/login')
    expect(mockAddItem).not.toHaveBeenCalled()
  })

  it('shows "Agotado" when stock is 0', () => {
    useAuthStoreMock.mockReturnValue({
      isAuthenticated: true,
    })

    const outOfStockProduct = { ...mockProduct, stock: 0 }
    render(<ProductCard product={outOfStockProduct} />)

    const button = screen.getByText('Agotado')
    expect(button).toBeDisabled()
  })

  it('formats price correctly', () => {
    useAuthStoreMock.mockReturnValue({
      isAuthenticated: true,
    })

    render(<ProductCard product={mockProduct} />)

    expect(screen.getByText("$1,000")).toBeInTheDocument()
  })
})