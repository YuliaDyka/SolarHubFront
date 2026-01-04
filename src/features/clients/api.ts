import api from '@/services/api'
import { type Client, type ClientsQuery, type ClientsResponse } from './types'

export interface ClientPayload {
  name: string
  email?: string
  phone?: string
  address?: string
  notes?: string
}

export async function getClientById(id: string) {
  const res = await api.get<Client>(`/client/${id}`)
  return res.data
}

export async function getManyClients(query: Partial<ClientsQuery>) {
  const res = await api.get<ClientsResponse>('/client', {
    params: query,
  })

  return res.data
}

export async function createClient(payload: ClientPayload) {
  const res = await api.post<Client>('/client', payload)
  return res.data
}

export async function updateClient(id: string, payload: Partial<ClientPayload>) {
  const res = await api.patch<Client>(`/client/${id}`, payload)
  return res.data
}

export async function deleteClient(id: string) {
  await api.delete(`/client/${id}`)
}
