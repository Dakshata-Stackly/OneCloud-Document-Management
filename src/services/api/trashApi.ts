import axios from 'axios'
import type { TrashDocument, TrashListResponse } from '../../types/trash'

export const getTrashDocuments =
  async (): Promise<TrashListResponse> => {
    const response = await axios.get<TrashListResponse>(
      '/api/trash',
    )

    return response.data
  }

export const restoreDocument = async (
  id: string,
): Promise<TrashDocument> => {
  const response = await axios.post<TrashDocument>(
    `/api/trash/${id}/restore`,
  )

  return response.data
}

export const permanentlyDeleteDocument = async (
  id: string,
): Promise<void> => {
  await axios.delete(`/api/trash/${id}`)
}