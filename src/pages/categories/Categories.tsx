import { useState } from 'react'
import {
  Folder,
  Plus,
  Pencil,
  Trash2,
  X,
  FileText,
  FolderOpen,
  Layers3,
} from 'lucide-react'
import { useCategories } from '../../hooks/useCategories'
import { useCategoryMutations } from '../../hooks/useCategoryMutations'

function Categories() {
  const { data, isLoading, isError } = useCategories()

  const {
    createMutation,
    updateMutation,
    deleteMutation,
  } = useCategoryMutations()

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(
    null,
  )
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const categories = data?.categories ?? []

  const totalDocuments = categories.reduce(
    (total, category) => total + category.documentCount,
    0,
  )

  const openCreateForm = () => {
    setEditingId(null)
    setName('')
    setDescription('')
    setIsFormOpen(true)
  }

  const openEditForm = (
    id: string,
    categoryName: string,
    categoryDescription: string,
  ) => {
    setEditingId(id)
    setName(categoryName)
    setDescription(categoryDescription)
    setIsFormOpen(true)
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setEditingId(null)
    setName('')
    setDescription('')
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!name.trim()) {
      return
    }

    if (editingId) {
      updateMutation.mutate(
        {
          id: editingId,
          name: name.trim(),
          description: description.trim(),
        },
        {
          onSuccess: closeForm,
        },
      )

      return
    }

    createMutation.mutate(
      {
        name: name.trim(),
        description: description.trim(),
      },
      {
        onSuccess: closeForm,
      },
    )
  }

  const handleDelete = (id: string, categoryName: string) => {
    const confirmed = window.confirm(
      `Delete "${categoryName}" category?`,
    )

    if (!confirmed) {
      return
    }

    deleteMutation.mutate(id)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-4 w-24 rounded bg-slate-200" />
          <div className="mt-3 h-9 w-56 rounded bg-slate-200" />

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="h-28 rounded-2xl bg-white" />
            <div className="h-28 rounded-2xl bg-white" />
            <div className="h-28 rounded-2xl bg-white" />
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-48 rounded-2xl bg-white"
              />
            ))}
          </div>
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
              Failed to load categories.
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
              <span className="text-slate-900">
                Categories
              </span>
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Categories
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Organize your documents into clear and manageable
              categories.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            Create Category
          </button>
        </section>

        <section className="mt-7 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Total Categories
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {data?.total ?? 0}
                </p>
              </div>

              <div className="rounded-xl bg-slate-100 p-3">
                <Layers3 className="h-5 w-5 text-slate-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Organized Documents
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {totalDocuments}
                </p>
              </div>

              <div className="rounded-xl bg-slate-100 p-3">
                <FileText className="h-5 w-5 text-slate-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Average Documents
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {categories.length > 0
                    ? Math.round(
                        totalDocuments / categories.length,
                      )
                    : 0}
                </p>
              </div>

              <div className="rounded-xl bg-slate-100 p-3">
                <FolderOpen className="h-5 w-5 text-slate-600" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6">
          {categories.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <Folder className="h-7 w-7 text-slate-400" />
              </div>

              <h2 className="mt-4 font-semibold text-slate-900">
                No categories yet
              </h2>

              <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
                Create your first category to start organizing
                your documents.
              </p>

              <button
                type="button"
                onClick={openCreateForm}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
              >
                <Plus className="h-4 w-4" />
                Create Category
              </button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 transition group-hover:bg-slate-900">
                      <Folder className="h-5 w-5 text-slate-600 transition group-hover:text-white" />
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          openEditForm(
                            category.id,
                            category.name,
                            category.description,
                          )
                        }
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        aria-label={`Edit ${category.name}`}
                      >
                        <Pencil className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            category.id,
                            category.name,
                          )
                        }
                        disabled={deleteMutation.isPending}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                        aria-label={`Delete ${category.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h2 className="text-lg font-semibold text-slate-900">
                      {category.name}
                    </h2>

                    <p className="mt-2 min-h-10 text-sm leading-5 text-slate-500">
                      {category.description ||
                        'No description available.'}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2 text-slate-500">
                      <FileText className="h-4 w-4" />

                      <span className="text-xs font-medium">
                        Documents
                      </span>
                    </div>

                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                      {category.documentCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    {editingId
                      ? 'Edit Category'
                      : 'Create Category'}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    {editingId
                      ? 'Update category information.'
                      : 'Add a new document category.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Close form"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-6"
              >
                <div>
                  <label
                    htmlFor="category-name"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Category Name
                  </label>

                  <input
                    id="category-name"
                    type="text"
                    value={name}
                    onChange={(event) =>
                      setName(event.target.value)
                    }
                    placeholder="Example: Finance"
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category-description"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Description
                  </label>

                  <textarea
                    id="category-description"
                    rows={4}
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    placeholder="Describe what this category is used for..."
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                  />
                </div>

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      createMutation.isPending ||
                      updateMutation.isPending
                    }
                    className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {createMutation.isPending ||
                    updateMutation.isPending
                      ? 'Saving...'
                      : editingId
                        ? 'Save Changes'
                        : 'Create Category'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Categories