export interface Client {
  id: string
  name: string
  phone: string | null
  email: string | null
  address: string | null
  notes: string | null
  createdAt: Date
  updatedAt: Date
  createdBy: string | null
  isActive: boolean
  _count: {
    projects: number
  }
  projects: {
    id: string
    name: string
    status: 'active' | 'finished' | 'planned'
  }[]
}

export type SortOrder = 'asc' | 'desc'

export interface ClientsQuery {
  search: string
  page: number
  limit: number
  sortBy: string;
  sortOrder: SortOrder;
}

export interface ClientsResponse {
  items: Client[]
  meta: { total: number; page: number; limit: number; totalPages: number }
}
