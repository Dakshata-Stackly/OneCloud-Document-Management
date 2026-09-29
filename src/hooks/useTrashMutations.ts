import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  restoreDocument,
  permanentlyDeleteDocument,
} from '../services/api/trashApi'

export const useTrashMutations = () => {
  const queryClient = useQueryClient()

  const restoreMutation = useMutation({
    mutationFn: restoreDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['trash'],
      })

      queryClient.invalidateQueries({
        queryKey: ['documents'],
      })

      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: permanentlyDeleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['trash'],
      })

      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      })
    },
  })

  return {
    restoreMutation,
    deleteMutation,
  }
}