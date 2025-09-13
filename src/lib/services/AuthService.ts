import { LoginFormData, RegisterFormData } from "../validations"

export const loginUser = async (data: LoginFormData) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error || 'Error al iniciar sesión')
  }

  return result
}

export const registerUser = async (data: RegisterFormData) => {

  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error || 'Error al registrar usuario')
  }

  return result
}

export const logoutUser = async () => {
  await fetch('/api/auth/logout', { method: 'POST' })
}