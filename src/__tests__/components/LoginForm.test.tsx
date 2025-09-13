import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import LoginForm from '@/components/auth/LoginForm'
import { useAuthStore } from '@/stores/authStore'

const useAuthStoreMock = useAuthStore as unknown as jest.Mock

// Mock the store
jest.mock('../../stores/authStore')

const mockLogin = jest.fn()
const mockPush = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock fetch
global.fetch = jest.fn()

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useAuthStoreMock.mockReturnValue({
      login: mockLogin,
    })
    ;(global.fetch as jest.Mock).mockClear()
  })

  it('renders login form correctly', () => {
    render(<LoginForm />)

    expect(screen.getAllByText('Iniciar Sesión').length).toEqual(2)
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Iniciar Sesión' })).toBeInTheDocument()
  })

  it('shows validation errors for invalid inputs', async () => {
    render(<LoginForm />)

    const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' })
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Email inválido')).toBeInTheDocument()
      expect(screen.getByText('La contraseña es requerida')).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    const user = userEvent.setup()
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user: { id: '1', name: 'Test User', email: 'test@example.com' },
        token: 'test-token'
      }),
    })

    render(<LoginForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Contraseña')
    const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'password123')
    
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123'
        })
      })
    })

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith(
        { id: '1', name: 'Test User', email: 'test@example.com' },
        'test-token'
      )
      expect(mockPush).toHaveBeenCalledWith('/')
    })
  })

  it('shows error message when login fails', async () => {
    const user = userEvent.setup()

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        error: 'Credenciales inválidas'
      }),
    })

    render(<LoginForm />)

    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Contraseña')
    const submitButton = screen.getByRole('button', { name: 'Iniciar Sesión' })

    await user.type(emailInput, 'test@example.com')
    await user.type(passwordInput, 'wrongpassword')
    
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument()
    })

    expect(mockLogin).not.toHaveBeenCalled()
    expect(mockPush).not.toHaveBeenCalled()
  })
})