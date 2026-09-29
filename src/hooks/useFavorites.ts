import { useQuery } from '@tanstack/react-query'
import { getFavoriteDocuments } from '../services/api/favoriteApi'

export const useFavorites = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: getFavoriteDocuments,
  })
}