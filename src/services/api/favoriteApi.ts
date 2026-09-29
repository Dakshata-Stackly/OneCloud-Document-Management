import axios from 'axios'
import type { FavoriteListResponse } from '../../types/favorite'

export const getFavoriteDocuments =
  async (): Promise<FavoriteListResponse> => {
    const response = await axios.get<FavoriteListResponse>(
      '/api/favorites',
    )

    return response.data
  }

export const removeFavorite = async (
  id: string,
): Promise<void> => {
  await axios.delete(`/api/favorites/${id}`)
}