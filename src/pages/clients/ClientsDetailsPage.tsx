import { Link, useNavigate, useParams } from 'react-router'
import { Button } from '@/components/ui/Button'
import { useClient } from '@/features/clients/hook'
import { ConfirmModal } from '@/components/ui/ConfirmModal'
import { useDeleteClient, useUpdateClient } from '@/features/clients/mutations'
import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { ClientForm } from '@/features/clients/ClientForm'
import type { Client } from '@/features/clients/types'

export function ClientDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingClient, setEditingClient] = useState<Client | null>(null)

  const { data, isLoading, isError } = useClient(id!)
  const deleteMutation = useDeleteClient()
  const updateMutation = useUpdateClient(id || '')

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading...</div>
  }

  if (isError || !data) {
    return <div className="text-sm text-red-600">Failed to load client</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to={'/clients'}
            className="mb-2 text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to clients
          </Link>

          <h1 className="text-xl font-semibold text-gray-900">{data.name}</h1>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setEditingClient(data)
              setModalOpen(true)
            }}
          >
            Edit
          </Button>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>
            Delete
          </Button>
        </div>
      </div>

      {/* Client info */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">Client information</h2>

        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <div className="text-gray-500">Name</div>
            <div className="font-medium text-gray-900">{data.name}</div>
          </div>

          <div>
            <div className="text-gray-500">Email</div>
            <div className="font-medium text-gray-900">{data.email || '—'}</div>
          </div>

          <div>
            <div className="text-gray-500">Phone</div>
            <div className="font-medium text-gray-900">{data.phone || '—'}</div>
          </div>

          <div>
            <div className="text-gray-500">Address</div>
            <div className="font-medium text-gray-900">{data.address || '—'}</div>
          </div>

          <div>
            <div className="text-gray-500">Created</div>
            <div className="font-medium text-gray-900">
              {new Date(data.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="row-end-5 col-span-2">
            <div className="text-gray-500">Notes</div>
            <div className="font-medium text-gray-900">{data.notes || '—'}</div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">Projects</h2>

        {data.projects.length === 0 ? (
          <div className="text-sm text-gray-500">No projects yet</div>
        ) : (
          <ul className="divide-y">
            {data.projects.map((project) => (
              <li key={project.id} className="flex items-center justify-between py-3">
                <div>
                  <div className="font-medium text-gray-900">{project.name}</div>
                  <div className="text-xs text-gray-500">{project.status}</div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  View
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Modal
        open={modalOpen}
        title={'Edit client'}
        onClose={() => setModalOpen(false)}
      >
        <ClientForm
          initialData={editingClient || undefined}
          loading={updateMutation.isPending}
          onSubmit={(data) => {
            if (editingClient) {
              updateMutation.mutate(data, {
                onSuccess: () => setModalOpen(false),
              })
            }
          }}
        />
      </Modal>
      <ConfirmModal
        open={confirmOpen}
        title="Delete client"
        description={`Are you sure you want to delete client "${data.name}"? This action cannot be undone.`}
        loading={deleteMutation.isPending}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() =>
          deleteMutation.mutate(data.id, {
            onSuccess: () => navigate('/clients'),
          })
        }
      />
    </div>
  )
}
