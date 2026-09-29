import axios from 'axios'

export interface UploadDocumentPayload {
  name: string
  category: string
  description?: string
  tags?: string
  file: File
}

export interface UploadDocumentResponse {
  message: string
  documentId: string
}

export const uploadDocument = async (
  payload: UploadDocumentPayload,
): Promise<UploadDocumentResponse> => {
  const formData = new FormData()

  formData.append('name', payload.name)
  formData.append('category', payload.category)
  formData.append('description', payload.description ?? '')
  formData.append('tags', payload.tags ?? '')
  formData.append('file', payload.file)

  const response = await axios.post<UploadDocumentResponse>(
    '/api/documents/upload',
    formData,
  )

  return response.data
}