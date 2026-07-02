import type { Supplement } from '@/types/Supplement'
import type { User } from '@/types/User'

const API_BASE_URL = 'http://localhost:8080'

export async function getSupplements(): Promise<Supplement[]> {
  const response = await fetch(`${API_BASE_URL}/supplements`)
  return response.json()
}

export async function filterSupplements(
  query: string,
  category: string,
  taken: string,
): Promise<Supplement[]> {
  const params = new URLSearchParams()

  if (query) params.append('query', query)
  if (category) params.append('category', category)
  if (taken) params.append('taken', taken)

  const response = await fetch(`${API_BASE_URL}/supplements/filter?${params.toString()}`)
  return response.json()
}

export async function createSupplement(supplement: Supplement): Promise<Supplement> {
  const response = await fetch(`${API_BASE_URL}/supplements`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(supplement),
  })

  return response.json()
}

export async function updateSupplement(id: number, supplement: Supplement): Promise<Supplement> {
  const response = await fetch(`${API_BASE_URL}/supplements/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(supplement),
  })

  return response.json()
}

export async function toggleSupplement(id: number): Promise<Supplement> {
  const response = await fetch(`${API_BASE_URL}/supplements/${id}/toggle`, {
    method: 'PATCH',
  })

  return response.json()
}

export async function deleteSupplement(id: number): Promise<void> {
  await fetch(`${API_BASE_URL}/supplements/${id}`, {
    method: 'DELETE',
  })
}

export async function registerUser(user: User): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })

  if (!response.ok) {
    throw new Error('Registration failed')
  }

  return response.json()
}

export async function loginUser(email: string, password: string): Promise<User> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error('Login failed')
  }

  return response.json()
}
