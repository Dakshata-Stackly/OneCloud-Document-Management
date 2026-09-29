import { z } from 'zod'

export const uploadDocumentSchema = z.object({
  name: z
    .string()
    .min(1, 'Document name is required')
    .min(3, 'Document name must be at least 3 characters'),

  category: z
    .string()
    .min(1, 'Please select a category'),

  description: z
    .string()
    .max(500, 'Description must not exceed 500 characters')
    .optional(),

  tags: z
    .string()
    .optional(),

  file: z
    .instanceof(File, {
      message: 'Please select a file',
    })
    .refine(
      (file) => file.size <= 10 * 1024 * 1024,
      'File size must be less than 10 MB',
    ),
})

export type UploadDocumentFormData = z.infer<
  typeof uploadDocumentSchema
>