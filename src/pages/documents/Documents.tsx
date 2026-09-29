import { useState } from 'react'
import {
  FileText,
  Search,
  Star,
  MoreVertical,
  Plus,
  Download,
  Pencil,
  Trash2,
  X,
  ChevronDown,
  FileSpreadsheet,
  FileImage,
  Presentation,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDocuments } from '../../hooks/useDocuments'
import { useDocumentMutations } from '../../hooks/useDocumentMutations'

function Documents() {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedFileType, setSelectedFileType] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedSort, setSelectedSort] = useState('recent')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const { data, isLoading, isError } = useDocuments()

  const {
    favoriteMutation,
    renameMutation,
    deleteMutation,
    downloadMutation,
  } = useDocumentMutations()

  const categories = [
    'All',
    ...new Set(
      data?.documents.map((document) => document.category) ?? [],
    ),
  ]

  const fileTypes = [
    'All',
    ...new Set(
      data?.documents.map((document) => document.fileType) ?? [],
    ),
  ]

  const statuses = [
    'All',
    ...new Set(
      data?.documents.map((document) => document.status) ?? [],
    ),
  ]

  const filteredDocuments = data?.documents
    .filter((document) => {
      const search = searchTerm.toLowerCase().trim()

      const matchesSearch =
        document.name.toLowerCase().includes(search) ||
        document.category.toLowerCase().includes(search) ||
        document.fileType.toLowerCase().includes(search)

      const matchesCategory =
        selectedCategory === 'All' ||
        document.category === selectedCategory

      const matchesFileType =
        selectedFileType === 'All' ||
        document.fileType === selectedFileType

      const matchesStatus =
        selectedStatus === 'All' ||
        document.status === selectedStatus

      return (
        matchesSearch &&
        matchesCategory &&
        matchesFileType &&
        matchesStatus
      )
    })
    .sort((a, b) => {
      if (selectedSort === 'name-asc') {
        return a.name.localeCompare(b.name)
      }

      if (selectedSort === 'name-desc') {
        return b.name.localeCompare(a.name)
      }

      if (selectedSort === 'oldest') {
        return (
          new Date(a.modifiedAt).getTime() -
          new Date(b.modifiedAt).getTime()
        )
      }

      return (
        new Date(b.modifiedAt).getTime() -
        new Date(a.modifiedAt).getTime()
      )
    })

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCategory !== 'All' ||
    selectedFileType !== 'All' ||
    selectedStatus !== 'All' ||
    selectedSort !== 'recent'

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setSelectedFileType('All')
    setSelectedStatus('All')
    setSelectedSort('recent')
  }

  const handleRename = (id: string, currentName: string) => {
    const newName = window.prompt(
      'Enter new document name:',
      currentName,
    )

    if (!newName?.trim() || newName.trim() === currentName) {
      setOpenMenuId(null)
      return
    }

    renameMutation.mutate({
      id,
      name: newName.trim(),
    })

    setOpenMenuId(null)
  }

  const handleDelete = (id: string, name: string) => {
    const confirmed = window.confirm(
      `Move "${name}" to trash?`,
    )

    if (!confirmed) {
      return
    }

    deleteMutation.mutate(id)
    setOpenMenuId(null)
  }

  const handleDownload = (id: string) => {
    downloadMutation.mutate(id)
    setOpenMenuId(null)
  }

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="mt-3 h-9 w-48 rounded bg-slate-200" />

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="h-24 rounded-2xl bg-white" />
            <div className="h-24 rounded-2xl bg-white" />
            <div className="h-24 rounded-2xl bg-white" />
          </div>

          <div className="mt-6 h-24 rounded-2xl bg-white" />
          <div className="mt-4 h-96 rounded-2xl bg-white" />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
            <p className="font-semibold text-red-600">
              Failed to load documents.
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
        <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span>Workspace</span>
              <span>/</span>
              <span className="text-slate-900">Documents</span>
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Documents
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Manage, organize and access all your documents
              from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/documents/upload')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            Upload Document
          </button>
        </section>

        <section className="mt-7 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Documents
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {data?.total ?? 0}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              In your workspace
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/favorites')}
            className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Favorites
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {data?.documents.filter(
                (document) => document.isFavorite,
              ).length ?? 0}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Quick access documents
            </p>
          </button>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Filtered Results
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              {filteredDocuments?.length ?? 0}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Matching current filters
            </p>
          </div>
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:flex">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(event) =>
                      setSelectedCategory(event.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-700 outline-none focus:border-slate-400 lg:w-40"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category === 'All'
                          ? 'All Categories'
                          : category}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>

                <div className="relative">
                  <select
                    value={selectedFileType}
                    onChange={(event) =>
                      setSelectedFileType(event.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-700 outline-none focus:border-slate-400 lg:w-36"
                  >
                    {fileTypes.map((fileType) => (
                      <option key={fileType} value={fileType}>
                        {fileType === 'All'
                          ? 'All Types'
                          : fileType}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>

                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(event) =>
                      setSelectedStatus(event.target.value)
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-4 pr-10 text-sm text-slate-700 outline-none focus:border-slate-400 lg:w-36"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status === 'All'
                          ? 'All Status'
                          : status}
                      </option>
                    ))}
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-3 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                Showing{' '}
                <span className="font-semibold text-slate-900">
                  {filteredDocuments?.length ?? 0}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-slate-900">
                  {data?.total ?? 0}
                </span>{' '}
                documents
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <select
                    value={selectedSort}
                    onChange={(event) =>
                      setSelectedSort(event.target.value)
                    }
                    className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-4 pr-9 text-sm text-slate-700 outline-none focus:border-slate-400"
                  >
                    <option value="recent">
                      Recently Modified
                    </option>
                    <option value="oldest">
                      Oldest Modified
                    </option>
                    <option value="name-asc">
                      Name A → Z
                    </option>
                    <option value="name-desc">
                      Name Z → A
                    </option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="hidden border-b border-slate-100 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 lg:grid lg:grid-cols-[minmax(0,1fr)_140px_130px_100px] lg:gap-4">
            <span>Document</span>
            <span>Category</span>
            <span>Modified</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredDocuments?.map((document) => {
              const FileIcon = getFileIcon(document.fileType)

              return (
                <div
                  key={document.id}
                  onClick={() =>
                    navigate(`/documents/${document.id}`)
                  }
                  className="group cursor-pointer px-5 py-5 transition hover:bg-slate-50 sm:px-6"
                >
                  <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_140px_130px_100px] lg:items-center lg:gap-4">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 transition group-hover:bg-white group-hover:shadow-sm">
                        <FileIcon className="h-5 w-5 text-slate-600" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-semibold text-slate-900">
                            {document.name}
                          </p>

                          {document.isFavorite && (
                            <Star className="h-3.5 w-3.5 shrink-0 fill-current text-amber-400" />
                          )}
                        </div>

                        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                          <span>{document.fileType}</span>
                          <span>•</span>
                          <span>{document.size} MB</span>

                          <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium lg:hidden">
                            {document.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 lg:mt-0">
                      <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                        {document.category}
                      </span>
                    </div>

                    <div className="mt-2 lg:mt-0">
                      <p className="text-xs font-medium text-slate-400 lg:hidden">
                        Modified
                      </p>

                      <p className="text-sm text-slate-600">
                        {document.modifiedAt}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2 lg:mt-0 lg:justify-end">
                      <span
                        className={`hidden rounded-full px-2.5 py-1 text-xs font-semibold lg:inline-flex ${
                          document.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {document.status}
                      </span>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation()

                          favoriteMutation.mutate(document.id, {
                            onSuccess: () => {
                              navigate('/favorites')
                            },
                          })
                        }}
                        disabled={favoriteMutation.isPending}
                        className="rounded-lg p-2 text-slate-300 transition hover:bg-white hover:text-amber-400 hover:shadow-sm disabled:opacity-50"
                        aria-label={
                          document.isFavorite
                            ? 'Remove from favorites'
                            : 'Add to favorites'
                        }
                      >
                        <Star
                          className={`h-5 w-5 ${
                            document.isFavorite
                              ? 'fill-current text-amber-400'
                              : ''
                          }`}
                        />
                      </button>

                      <div className="relative">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation()
                            setOpenMenuId(
                              openMenuId === document.id
                                ? null
                                : document.id,
                            )
                          }}
                          className="rounded-lg p-2 text-slate-400 transition hover:bg-white hover:text-slate-700 hover:shadow-sm"
                          aria-label={`Actions for ${document.name}`}
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>

                        {openMenuId === document.id && (
                          <div className="absolute right-0 z-30 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation()
                                handleRename(
                                  document.id,
                                  document.name,
                                )
                              }}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Pencil className="h-4 w-4" />
                              Rename
                            </button>

                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation()
                                handleDownload(document.id)
                              }}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </button>

                            <button
                              type="button"
                              onClick={(event) => {
                                event.stopPropagation()
                                handleDelete(
                                  document.id,
                                  document.name,
                                )
                              }}
                              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                              Move to Trash
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {filteredDocuments?.length === 0 && (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                  <FileText className="h-7 w-7 text-slate-400" />
                </div>

                <h3 className="mt-4 font-semibold text-slate-900">
                  No documents found
                </h3>

                <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                  Try changing your search or filters to find
                  the document you are looking for.
                </p>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 text-sm font-semibold text-slate-900 hover:underline"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Documents