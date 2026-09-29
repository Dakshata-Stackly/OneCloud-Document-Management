import { useState } from 'react'
import {
  LayoutDashboard,
  FileText,
  Folder,
  Heart,
  Trash2,
  Menu,
  X,
  Cloud,
} from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'

const navigationItems = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Documents',
    path: '/documents',
    icon: FileText,
  },
  {
    name: 'Categories',
    path: '/categories',
    icon: Folder,
  },
  {
    name: 'Favorites',
    path: '/favorites',
    icon: Heart,
  },
  {
    name: 'Trash',
    path: '/trash',
    icon: Trash2,
  },
]

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 items-center justify-between border-b border-slate-200 px-5">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-slate-900 p-2.5">
                <Cloud className="h-5 w-5 text-white" />
              </div>

              <div>
                <p className="text-lg font-bold text-slate-900">
                  OneCloud
                </p>

                <p className="text-xs text-slate-500">
                  Document Management
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 lg:hidden"
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Workspace
            </p>

            {navigationItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </NavLink>
              )
            })}
          </nav>

          <div className="border-t border-slate-200 p-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">
                OneCloud Workspace
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Manage and organize your documents securely.
              </p>
            </div>
          </div>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100"
            aria-label="Open navigation"
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="ml-3">
            <p className="font-semibold text-slate-900">
              OneCloud
            </p>

            <p className="text-xs text-slate-500">
              Document Management
            </p>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout