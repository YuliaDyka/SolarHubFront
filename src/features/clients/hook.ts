import { useQuery } from '@tanstack/react-query'
import { getClientById, getManyClients } from './api'
import { clientsKeys } from './queryKeys'
import type { ClientsQuery } from './types'

export function useManyClients(query: ClientsQuery) {
  return useQuery({
    queryKey: clientsKeys.list(query),
    queryFn: () => getManyClients(query),
  })
}

export function useClient(id: string) {
  return useQuery({
    queryKey: clientsKeys.detail(id),
    queryFn: () => getClientById(id),
    enabled: !!id,
  })
}
