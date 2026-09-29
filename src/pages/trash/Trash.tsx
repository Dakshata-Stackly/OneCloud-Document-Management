import {
  ArrowLeft,
  FileText,
  RotateCcw,
  Trash2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTrash } from '../../hooks/useTrash'
import { useTrashMutations } from '../../hooks/useTrashMutations'

function Trash() {
  const navigate = useNavigate()

  const { data, isLoading, isError } = useTrash()

  const {
    restoreMutation,
    deleteMutation,
  } = useTrashMutations()

  const handleRestore = (id: string, name: string) => {
    const confirmed = window.confirm(
      `Restore "${name}"?`,
    )

    if (!confirmed) {
      return
    }

    restoreMutation.mutate(id)
  }

  const handlePermanentDelete = (
    id: string,
    name: string,
  ) => {
    const confirmed = window.confirm(
      `Permanently delete "${name}"? This action cannot be undone.`,
    )

    if (!confirmed) {
      return
    }

    deleteMutation.mutate(id)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-10 w-10 rounded-xl bg-slate-200" />
            <div className="mt-6 h-4 w-32 rounded bg-slate-200" />
            <div className="mt-3 h-9 w-40 rounded bg-slate-200" />
            <div className="mt-8 h-24 rounded-2xl bg-white" />
            <div className="mt-4 h-24 rounded-2xl bg-white" />
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 rounded-xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
            <p className="font-semibold text-red-600">
              Failed to load trash.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Please refresh the page and try again.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="mb-6 rounded-xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <section className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            Document Management
          </p>

          <div className="mt-1 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Trash
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Restore deleted documents or permanently remove them.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
              <Trash2 className="h-4 w-4 text-slate-400" />
              {data?.total ?? 0} documents
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-5">
            <h2 className="font-semibold text-slate-900">
              Deleted Documents
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Documents moved to trash can be restored or permanently deleted.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {data?.documents.map((document) => (
              <div
                key={document.id}
                className="group flex flex-col gap-5 px-6 py-5 transition hover:bg-slate-50 sm:flex-row sm:items-center"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition group-hover:bg-white group-hover:shadow-sm">
                    <FileText className="h-5 w-5 text-slate-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {document.name}
                    </p>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="rounded-md bg-slate-100 px-2 py-1">
                        {document.category}
                      </span>

                      <span>{document.fileType}</span>
                      <span>•</span>
                      <span>{document.size} MB</span>
                      <span>•</span>
                      <span>Deleted {document.deletedAt}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 sm:shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      handleRestore(
                        document.id,
                        document.name,
                      )
                    }
                    disabled={restoreMutation.isPending}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Restore
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handlePermanentDelete(
                        document.id,
                        document.name,
                      )
                    }
                    disabled={deleteMutation.isPending}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete Permanently
                  </button>
                </div>
              </div>
            ))}

            {data?.documents.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                  <Trash2 className="h-7 w-7 text-slate-400" />
                </div>

                <p className="mt-4 font-semibold text-slate-900">
                  Trash is empty
                </p>

                <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                  Deleted documents will appear here.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Trash