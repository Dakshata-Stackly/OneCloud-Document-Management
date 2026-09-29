import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import Dashboard from '../pages/dashboard/Dashboard'
import Documents from '../pages/documents/Documents'
import DocumentDetails from '../pages/documents/DocumentDetails'
import UploadDocument from '../pages/upload/UploadDocument'
import Categories from '../pages/categories/Categories'
import Favorites from '../pages/favorites/Favorites'
import Trash from '../pages/trash/Trash'

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900">
          404
        </h1>

        <p className="mt-3 text-lg font-medium text-slate-700">
          Page not found
        </p>

        <p className="mt-1 text-sm text-slate-500">
          The page you are looking for does not exist.
        </p>

        <a
          href="/dashboard"
          className="mt-6 inline-block rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/documents" element={<Documents />} />

        <Route
          path="/documents/upload"
          element={<UploadDocument />}
        />

        <Route
          path="/documents/:id"
          element={<DocumentDetails />}
        />

        <Route path="/categories" element={<Categories />} />

        <Route path="/favorites" element={<Favorites />} />

        <Route path="/trash" element={<Trash />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes