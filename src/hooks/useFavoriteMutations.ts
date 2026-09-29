import { useMutation, useQueryClient } from '@tanstack/react-query'
import { removeFavorite } from '../services/api/favoriteApi'

export const useFavoriteMutations = () => {
  const queryClient = useQueryClient()

  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      })

      queryClient.invalidateQueries({
        queryKey: ['documents'],
      })

      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      })
    },
  })

  return {
    removeMutation,
  }
}