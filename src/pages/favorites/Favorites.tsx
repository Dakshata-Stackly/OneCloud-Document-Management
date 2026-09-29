import { useMemo, useState } from 'react'
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  FileImage,
  Search,
  Star,
  ExternalLink,
  Trash2,
  Folder,
  CalendarDays,
  HardDrive,
  Heart,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useFavorites } from '../../hooks/useFavorites'
import { useFavoriteMutations } from '../../hooks/useFavoriteMutations'

function Favorites() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const { data, isLoading, isError } = useFavorites()
  const { removeMutation } = useFavoriteMutations()

  const filteredDocuments = useMemo(() => {
    const documents = data?.documents ?? []
    const search = searchTerm.toLowerCase().trim()

    if (!search) {
      return documents
    }

    return documents.filter(
      (document) =>
        document.name.toLowerCase().includes(search) ||
        document.category.toLowerCase().includes(search) ||
        document.fileType.toLowerCase().includes(search),
    )
  }, [data?.documents, searchTerm])

  const totalSize = useMemo(() => {
    return (data?.documents ?? [])
      .reduce((total, document) => total + document.size, 0)
      .toFixed(1)
  }, [data?.documents])

  const categoriesCount = useMemo(() => {
    return new Set(
      (data?.documents ?? []).map((document) => document.category),
    ).size
  }, [data?.documents])

  const getFileIcon = (fileType: string) => {
    const type = fileType.toUpperCase()

    if (type === 'XLSX' || type === 'CSV') {
      return FileSpreadsheet
    }

    if (type === 'PPTX' || type === 'PPT') {
      return Presentation
    }

    if (type === 'PNG' || type === 'JPG' || type === 'JPEG') {
      return FileImage
    }

    return FileText
  }

  const getFileIconStyle = (fileType: string) => {
    const type = fileType.toUpperCase()

    if (type === 'XLSX' || type === 'CSV') {
      return 'bg-emerald-50 text-emerald-600'
    }

    if (type === 'PPTX' || type === 'PPT') {
      return 'bg-orange-50 text-orange-600'
    }

    if (type === 'PNG' || type === 'JPG' || type === 'JPEG') {
      return 'bg-purple-50 text-purple-600'
    }

    return 'bg-blue-50 text-blue-600'
  }

  const handleRemoveFavorite = (id: string, name: string) => {
    const confirmed = window.confirm(
      `Remove "${name}" from favorites?`,
    )

    if (!confirmed) {
      return
    }

    removeMutation.mutate(id)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-slate-200" />

          <div className="grid gap-4 sm:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-28 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>

          <div className="h-16 animate-pulse rounded-2xl bg-white shadow-sm" />

          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-2xl bg-white shadow-sm"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <Heart className="h-7 w-7 text-red-500" />
          </div>

          <h2 className="mt-5 text-xl font-bold text-slate-900">
            Unable to load favorites
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Something went wrong while loading your favorite documents.
            Please try again.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <span>Workspace</span>
              <span>/</span>
              <span className="font-medium text-slate-700">
                Favorites
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 shadow-sm">
                <Heart className="h-6 w-6 fill-white text-white" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Favorite Documents
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  Quickly access the documents you use most.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate('/documents')}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
          >
            <FileText className="h-4 w-4" />
            Browse Documents
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Total Favorites
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {data?.total ?? 0}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50">
                <Star className="h-5 w-5 fill-rose-500 text-rose-500" />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Documents saved for quick access
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Storage Used
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {totalSize}
                  <span className="ml-1 text-base font-semibold text-slate-500">
                    MB
                  </span>
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                <HardDrive className="h-5 w-5 text-blue-600" />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Combined size of favorite documents
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Categories
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {categoriesCount}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50">
                <Folder className="h-5 w-5 text-violet-600" />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              Categories represented in favorites
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search favorite documents..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:ring-2 focus:ring-slate-100"
            />
          </div>
        </div>

        {/* Section Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Saved Documents
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {filteredDocuments.length} document
              {filteredDocuments.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
              <Heart className="h-7 w-7 text-slate-400" />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              {searchTerm
                ? 'No matching favorites'
                : 'No favorite documents yet'}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              {searchTerm
                ? 'Try another search term or clear the current search.'
                : 'Favorite important documents from the Documents page to access them quickly here.'}
            </p>

            {!searchTerm && (
              <button
                type="button"
                onClick={() => navigate('/documents')}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                <FileText className="h-4 w-4" />
                Browse Documents
              </button>
            )}
          </div>
        )}

        {/* Desktop Table */}
        {filteredDocuments.length > 0 && (
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
            <div className="border-b border-slate-200 bg-slate-50/70 px-6 py-4">
              <div className="grid grid-cols-[minmax(280px,2fr)_1fr_1fr_120px] gap-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span>Document</span>
                <span>Category</span>
                <span>Modified</span>
                <span className="text-right">Actions</span>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredDocuments.map((document) => {
                const Icon = getFileIcon(document.fileType)

                return (
                  <div
                    key={document.id}
                    className="grid grid-cols-[minmax(280px,2fr)_1fr_1fr_120px] items-center gap-4 px-6 py-5 transition hover:bg-slate-50/70"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getFileIconStyle(
                          document.fileType,
                        )}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/documents/${document.id}`)
                          }
                          className="block max-w-full truncate text-left text-sm font-semibold text-slate-900 hover:text-slate-600"
                        >
                          {document.name}
                        </button>

                        <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                          <span>{document.fileType}</span>
                          <span>•</span>
                          <span>{document.size} MB</span>
                        </div>
                      </div>

                      <Star className="ml-auto h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Folder className="h-4 w-4 text-slate-400" />
                      <span>{document.category}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <CalendarDays className="h-4 w-4 text-slate-400" />
                      <span>{formatDate(document.modifiedAt)}</span>
                    </div>

                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/documents/${document.id}`)
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        title="Open document"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveFavorite(
                            document.id,
                            document.name,
                          )
                        }
                        disabled={removeMutation.isPending}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
                        title="Remove from favorites"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Mobile Cards */}
        {filteredDocuments.length > 0 && (
          <div className="space-y-3 md:hidden">
            {filteredDocuments.map((document) => {
              const Icon = getFileIcon(document.fileType)

              return (
                <div
                  key={document.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${getFileIconStyle(
                        document.fileType,
                      )}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            navigate(`/documents/${document.id}`)
                          }
                          className="truncate text-left text-sm font-semibold text-slate-900"
                        >
                          {document.name}
                        </button>

                        <Star className="h-4 w-4 shrink-0 fill-amber-400 text-amber-400" />
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        {document.fileType} • {document.size} MB
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                    <div>
                      <p className="text-xs text-slate-400">Category</p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {document.category}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-400">Modified</p>
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {formatDate(document.modifiedAt)}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        navigate(`/documents/${document.id}`)
                      }
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveFavorite(
                          document.id,
                          document.name,
                        )
                      }
                      disabled={removeMutation.isPending}
                      className="flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                      title="Remove from favorites"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites