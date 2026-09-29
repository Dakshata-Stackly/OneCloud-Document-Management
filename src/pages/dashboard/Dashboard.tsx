import {
  FileText,
  HardDrive,
  Heart,
  Share2,
  Clock,
  ArrowUpRight,
  FolderOpen,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useDashboard } from '../../hooks/useDashboard'

function Dashboard() {
  const navigate = useNavigate()
  const { data, isLoading, isError } = useDashboard()

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-4 w-24 rounded bg-slate-200" />
            <div className="mt-3 h-9 w-64 rounded bg-slate-200" />
            <div className="mt-3 h-4 w-80 rounded bg-slate-200" />

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-36 rounded-2xl bg-white shadow-sm"
                />
              ))}
            </div>
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
              Failed to load dashboard data.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Please refresh the page and try again.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: 'Total Documents',
      value: data?.stats.totalDocuments ?? 0,
      description: 'Documents in workspace',
      icon: FileText,
      clickable: true,
      onClick: () => navigate('/documents'),
    },
    {
      title: 'Storage Used',
      value: `${data?.stats.storageUsed ?? 0} GB`,
      description: 'Current storage usage',
      icon: HardDrive,
      clickable: false,
    },
    {
      title: 'Favorite Documents',
      value: data?.stats.favoriteDocuments ?? 0,
      description: 'Saved for quick access',
      icon: Heart,
      clickable: true,
      onClick: () => navigate('/favorites'),
    },
    {
      title: 'Shared Documents',
      value: data?.stats.sharedDocuments ?? 0,
      description: 'Shared with your team',
      icon: Share2,
      clickable: false,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-8 shadow-lg sm:px-8 lg:px-10">
          <div className="relative z-10 max-w-2xl">
            <p className="text-sm font-medium text-slate-300">
              OneCloud Workspace
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Welcome to your dashboard
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
              Manage, organize and access all your documents
              from one centralized workspace.
            </p>

            <button
              type="button"
              onClick={() => navigate('/documents')}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              View Documents
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-slate-700/50" />
          <div className="absolute -bottom-24 right-20 h-48 w-48 rounded-full bg-slate-800" />
        </section>

        <section className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.title}
                role={stat.clickable ? 'button' : undefined}
                tabIndex={stat.clickable ? 0 : undefined}
                onClick={stat.clickable ? stat.onClick : undefined}
                onKeyDown={
                  stat.clickable
                    ? (event) => {
                        if (
                          event.key === 'Enter' ||
                          event.key === ' '
                        ) {
                          event.preventDefault()
                          stat.onClick?.()
                        }
                      }
                    : undefined
                }
                className={`group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 ${
                  stat.clickable
                    ? 'cursor-pointer hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-slate-300'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-slate-100 p-3 transition group-hover:bg-slate-900">
                    <Icon className="h-5 w-5 text-slate-700 transition group-hover:text-white" />
                  </div>

                  {stat.clickable ? (
                    <ArrowUpRight className="h-4 w-4 text-slate-300 transition group-hover:text-slate-500" />
                  ) : (
                    <span className="h-4 w-4" />
                  )}
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  {stat.description}
                </p>

                {stat.clickable && (
                  <p className="mt-4 text-xs font-semibold text-slate-400 transition group-hover:text-slate-700">
                    Click to view →
                  </p>
                )}
              </div>
            )
          })}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-slate-100 p-2.5">
                  <Clock className="h-5 w-5 text-slate-700" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-900">
                    Recently Modified
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Your latest document activity
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate('/documents')}
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                View all
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {data?.recentDocuments.map((document) => (
                <button
                  key={document.id}
                  type="button"
                  onClick={() =>
                    navigate(`/documents/${document.id}`)
                  }
                  className="flex w-full items-center gap-4 px-6 py-4 text-left transition hover:bg-slate-50"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                    <FileText className="h-5 w-5 text-slate-600" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {document.name}
                    </p>

                    <div className="mt-1 flex items-center gap-2">
                      <FolderOpen className="h-3.5 w-3.5 text-slate-400" />

                      <p className="text-xs text-slate-500">
                        {document.category}
                      </p>
                    </div>
                  </div>

                  <div className="hidden text-right sm:block">
                    <p className="text-xs font-medium text-slate-500">
                      Modified
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {document.modifiedAt}
                    </p>
                  </div>

                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300" />
                </button>
              ))}

              {data?.recentDocuments.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <FileText className="mx-auto h-10 w-10 text-slate-300" />

                  <p className="mt-3 font-medium text-slate-700">
                    No recent documents
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Recently modified documents will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-full flex-col">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
                  <FolderOpen className="h-5 w-5 text-slate-700" />
                </div>

                <h2 className="mt-5 text-lg font-semibold text-slate-900">
                  Document Workspace
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Keep your documents organized and quickly
                  access the files you use most.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => navigate('/documents')}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Browse Documents
                  <ArrowUpRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/favorites')}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  View Favorites
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard