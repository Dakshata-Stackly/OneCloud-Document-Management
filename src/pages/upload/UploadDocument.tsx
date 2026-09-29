import { ArrowLeft, FileUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useUploadDocument } from '../../hooks/useUploadDocument'

const allowedFileTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
]

const uploadSchema = z.object({
  name: z
    .string()
    .min(1, 'Document name is required')
    .max(100, 'Document name must be less than 100 characters'),

  category: z.string().min(1, 'Category is required'),

  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),

  tags: z.string().optional(),

  file: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'Please select a file')
    .refine(
      (files) =>
        files.length === 0 ||
        allowedFileTypes.includes(files[0].type),
      'Only PDF, DOC, DOCX, XLS, XLSX, PPT and PPTX files are allowed',
    )
    .refine(
      (files) =>
        files.length === 0 ||
        files[0].size <= 10 * 1024 * 1024,
      'File size must be less than 10 MB',
    ),
})

type UploadFormData = z.infer<typeof uploadSchema>

function UploadDocument() {
  const navigate = useNavigate()
  const uploadMutation = useUploadDocument()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
  })

  const onSubmit = async (data: UploadFormData) => {
    const payload = {
      name: data.name,
      category: data.category,
      description: data.description,
      tags: data.tags,
      file: data.file[0],
    }

    try {
      const response = await uploadMutation.mutateAsync(payload)

      alert(response.message)

      reset()
    } catch {
      alert('Failed to upload document.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate('/documents')}
          aria-label="Go back to documents"
          className="mb-6 rounded-xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>

        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500">
            Document Management
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Upload Document
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Add a new document to your OneCloud workspace.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div>
            <label className="text-sm font-medium text-slate-700">
              Document Name
            </label>

            <input
              type="text"
              placeholder="Enter document name"
              {...register('name')}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Category
            </label>

            <select
              {...register('category')}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
            >
              <option value="">Select category</option>
              <option value="Projects">Projects</option>
              <option value="HR">HR</option>
              <option value="Technical">Technical</option>
              <option value="Reports">Reports</option>
            </select>

            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Enter document description"
              {...register('description')}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
            />

            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Tags
            </label>

            <input
              type="text"
              placeholder="project, report, technical"
              {...register('tags')}
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-slate-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              File
            </label>

            <div className="mt-2 rounded-xl border-2 border-dashed border-slate-200 p-6 text-center">
              <FileUp className="mx-auto h-8 w-8 text-slate-400" />

              <p className="mt-2 text-sm text-slate-500">
                Select a document to upload
              </p>

              <p className="mt-1 text-xs text-slate-400">
                PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX • Maximum 10 MB
              </p>

              <input
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                {...register('file')}
                className="mt-4 block w-full text-sm text-slate-600"
              />
            </div>

            {errors.file && (
              <p className="mt-1 text-sm text-red-500">
                {errors.file.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={uploadMutation.isPending}
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {uploadMutation.isPending
              ? 'Uploading...'
              : 'Upload Document'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UploadDocument