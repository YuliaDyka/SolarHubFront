import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import {
  Table,
  TableHeader,
  TableRow,
  TableSortableHead,
  TableBody,
  TableCell,
  TableHead,
} from '@/components/ui/Table'
import { useManyClients } from '@/features/clients/hook'
import { useDebounce } from '@/hooks/useDebounce'
import { Modal } from '@/components/ui/Modal'
import { ClientForm } from '@/features/clients/ClientForm'
import { useCreateClient, useUpdateClient, useDeleteClient } from '@/features/clients/mutations'
import { type Client } from '@/features/clients/types'
import { toast } from 'react-toastify'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { Link, useNavigate } from 'react-router'
import { useQueryPagination } from '@/hooks/useQueryPagination'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'

const selectValues = [
  { value: 20, label: '20' },
  { value: 40, label: '40' },
  { value: 80, label: '80' },
]

const ClientsPage = () => {
  const navigate = useNavigate()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Client | null>(null)

  const deleteMutation = useDeleteClient()
  const createMutation = useCreateClient()
  const updateMutation = useUpdateClient(editingClient?.id || '')

  const { search, page, limit, sortBy, sortOrder, setQuery } = useQueryPagination()

  const [searchState, setSearchState] = useState(search)
  const debouncedSearch = useDebounce(searchState)

  const { data, isLoading, isError, error } = useManyClients({
    search: debouncedSearch,
    page,
    limit,
    sortBy,
    sortOrder,
  })

  const clients = data?.items ?? []

  useEffect(() => {
    if (isError) toast.error(error.message)
    if (updateMutation.isError) toast.error(updateMutation.error.message)
    if (createMutation.isError) toast.error(createMutation.error.message)
  }, [isError, updateMutation.isError, createMutation.isError])

  useEffect(() => {
    setQuery({ search: searchState, page: 1 })
  }, [debouncedSearch])

  const handleSort = (field: string) => {
    setQuery({
      sortBy: field,
      sortOrder: sortBy === field && sortOrder === 'asc' ? 'desc' : 'asc',
      page: 1,
    })
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchState(e.target.value)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Clients</h1>
          <p className="text-sm text-gray-600">Manage your customers and their projects</p>
        </div>

        <Button
          onClick={() => {
            setEditingClient(null)
            setModalOpen(true)
          }}
        >
          Add client
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <input
          value={searchState}
          onChange={handleSearch}
          placeholder="Search by name, email or phone"
          className="h-10 w-72 rounded-md border border-gray-300 px-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      <div>
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading clients...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableSortableHead
                  label="Name"
                  field="name"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableSortableHead
                  label="Email"
                  field="email"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableSortableHead
                  label="Phone"
                  field="phone"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableSortableHead
                  label="Address"
                  field="address"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableSortableHead
                  label="Notes"
                  field="notes"
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                <TableHead>Projects</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email || '—'}</TableCell>
                  <TableCell>{client.phone || '—'}</TableCell>
                  <TableCell>{client.address || '—'}</TableCell>
                  <TableCell className="max-w-32">
                    <div className="truncate">{client.notes || '—'}</div>
                  </TableCell>
                  <TableCell>{client._count.projects}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Link to={`/clients/${client.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/clients/${client.id}`)}
                      >
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setEditingClient(client)
                        setModalOpen(true)
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => setDeleteTarget(client)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {clients.length === 0 && (
                <TableRow>
                  <TableCell aria-colspan={7} className="text-center text-gray-500">
                    No clients found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        <div className="flex justify-between items-center">
          <Pagination
            page={page}
            totalPages={data ? data.meta.totalPages : 1}
            onChange={(p) => setQuery({ page: p })}
          />
          <Select
            options={selectValues}
            value={selectValues[0]}
            onChange={(lim) => setQuery({ page: 1, limit: lim.value })}
            menuPlacement="top"
          />
        </div>
      </div>

      <Modal
        open={modalOpen}
        title={editingClient ? 'Edit client' : 'Add client'}
        onClose={() => setModalOpen(false)}
      >
        <ClientForm
          initialData={editingClient || undefined}
          loading={createMutation.isPending || updateMutation.isPending}
          onSubmit={(data) => {
            if (editingClient) {
              updateMutation.mutate(data, {
                onSuccess: () => setModalOpen(false),
              })
            } else {
              createMutation.mutate(data, {
                onSuccess: () => setModalOpen(false),
              })
            }
          }}
        />
      </Modal>
      <ConfirmModal
        open={!!deleteTarget}
        title="Delete client"
        description={
          deleteTarget
            ? `Are you sure you want to delete client "${deleteTarget.name}"? This action cannot be undone.`
            : ''
        }
        loading={deleteMutation.isPending}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return

          deleteMutation.mutate(deleteTarget.id, {
            onSuccess: () => setDeleteTarget(null),
          })
        }}
      />
    </div>
  )
}

export default ClientsPage
