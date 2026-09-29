import {
  ArrowLeft,
  FileText,
  Star,
  Pencil,
  Download,
  Trash2,
  CalendarDays,
  HardDrive,
  FolderOpen,
  Tag,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import { useDocumentMutations } from '../../hooks/useDocumentMutations'

function DocumentDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data, isLoading, isError } = useDocument(id ?? '')

  const {
    favoriteMutation,
    renameMutation,
    deleteMutation,
    downloadMutation,
  } = useDocumentMutations()

  const handleRename = () => {
    if (!data) {
      return
    }

    const newName = window.prompt(
      'Enter new document name:',
      data.name,
    )

    if (!newName?.trim() || newName.trim() === data.name) {
      return
    }

    renameMutation.mutate({
      id: data.id,
      name: newName.trim(),
    })
  }

  const handleDelete = () => {
    if (!data) {
      return
    }

    const confirmed = window.confirm(
      `Move "${data.name}" to trash?`,
    )

    if (!confirmed) {
      return
    }

    deleteMutation.mutate(data.id, {
      onSuccess: () => {
        navigate('/documents')
      },
    })
  }

  const handleDownload = () => {
    if (!data) {
      return
    }

    downloadMutation.mutate(data.id)
  }

  const handleFavorite = () => {
    if (!data) {
      return
    }

    favoriteMutation.mutate(data.id)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="h-10 w-28 rounded-xl bg-slate-200" />

          <div className="mt-6 h-52 rounded-3xl bg-white" />

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="h-72 rounded-2xl bg-white lg:col-span-2" />
            <div className="h-72 rounded-2xl bg-white" />
          </div>
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
            <p className="font-semibold text-red-600">
              Failed to load document.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              The document could not be found or loaded.
            </p>

            <button
              type="button"
              onClick={() => navigate('/documents')}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <button
          type="button"
          onClick={() => navigate('/documents')}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          
        </button>

        <section className="relative mt-6 overflow-hidden rounded-3xl bg-slate-900 p-6 shadow-lg sm:p-8">
          <div className="relative z-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-start gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
                  <FileText className="h-8 w-8 text-white" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                      {data.status}
                    </span>

                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-slate-300">
                      {data.fileType}
                    </span>
                  </div>

                  <h1 className="mt-3 break-words text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {data.name}
                  </h1>

                  <p className="mt-2 text-sm text-slate-400">
                    {data.category} workspace
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleFavorite}
                  disabled={favoriteMutation.isPending}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10 disabled:opacity-50"
                >
                  <Star
                    className={`h-4 w-4 ${
                      data.isFavorite
                        ? 'fill-current text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                  {data.isFavorite ? 'Unfavorite' : 'Favorite'}
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloadMutation.isPending}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          </div>

          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-28 right-24 h-52 w-52 rounded-full bg-white/[0.03]" />
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5">
                  <FileText className="h-5 w-5 text-slate-700" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Document Information
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Details and metadata for this document
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-x-8 gap-y-7 p-6 sm:grid-cols-2">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <FolderOpen className="h-3.5 w-3.5" />
                  Category
                </div>

                <p className="mt-2 text-sm font-medium text-slate-900">
                  {data.category}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <FileText className="h-3.5 w-3.5" />
                  File Type
                </div>

                <p className="mt-2 text-sm font-medium text-slate-900">
                  {data.fileType}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <HardDrive className="h-3.5 w-3.5" />
                  File Size
                </div>

                <p className="mt-2 text-sm font-medium text-slate-900">
                  {data.size} MB
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Last Modified
                </div>

                <p className="mt-2 text-sm font-medium text-slate-900">
                  {data.modifiedAt}
                </p>
              </div>

              <div className="sm:col-span-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Tag className="h-3.5 w-3.5" />
                  Tags
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {data.tags.length > 0 ? (
                    data.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">
                      No tags added
                    </span>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Description
                </div>

                <div className="mt-3 rounded-xl bg-slate-50 p-4">
                  <p className="text-sm leading-6 text-slate-600">
                    {data.description ||
                      'No description available for this document.'}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-semibold text-slate-900">
                Document Status
              </h2>

              <div className="mt-5 flex items-center gap-3 rounded-xl bg-emerald-50 p-4">
                <div className="rounded-full bg-emerald-100 p-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-emerald-800">
                    {data.status}
                  </p>

                  <p className="mt-0.5 text-xs text-emerald-600">
                    Document is available
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-4 w-4 text-slate-400" />

                  <div>
                    <p className="text-xs text-slate-400">
                      Last modified
                    </p>

                    <p className="mt-0.5 text-sm font-medium text-slate-700">
                      {data.modifiedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-slate-400" />

                  <div>
                    <p className="text-xs text-slate-400">
                      Storage status
                    </p>

                    <p className="mt-0.5 text-sm font-medium text-slate-700">
                      Securely stored
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="font-semibold text-slate-900">
                Actions
              </h2>

              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={handleRename}
                  disabled={renameMutation.isPending}
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  <Pencil className="h-4 w-4" />
                  Rename Document
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloadMutation.isPending}
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  Download Document
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="flex w-full items-center gap-3 rounded-xl border border-red-100 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Move to Trash
                </button>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default DocumentDetails