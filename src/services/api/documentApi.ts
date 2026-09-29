import axios from 'axios'
import type {
  Document,
  DocumentListResponse,
} from '../../types/document'

export const getDocuments = async (): Promise<DocumentListResponse> => {
  const response = await axios.get<DocumentListResponse>(
    '/api/documents',
  )

  return response.data
}

export const getDocumentById = async (
  id: string,
): Promise<Document> => {
  const response = await axios.get<Document>(
    `/api/documents/${id}`,
  )

  return response.data
}

export const toggleFavorite = async (
  id: string,
): Promise<Document> => {
  const response = await axios.patch<Document>(
    `/api/documents/${id}/favorite`,
  )

  return response.data
}

export const renameDocument = async (
  id: string,
  name: string,
): Promise<Document> => {
  const response = await axios.patch<Document>(
    `/api/documents/${id}/rename`,
    { name },
  )

  return response.data
}

export const deleteDocument = async (
  id: string,
): Promise<void> => {
  await axios.delete(`/api/documents/${id}`)
}

export const downloadDocument = async (
  id: string,
): Promise<Blob> => {
  const response = await axios.get(
    `/api/documents/${id}/download`,
    {
      responseType: 'blob',
    },
  )

  return response.data
}