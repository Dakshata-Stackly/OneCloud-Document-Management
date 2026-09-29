import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '../services/api/categoryApi'

export const useCategoryMutations = () => {
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      name,
      description,
    }: {
      id: string
      name: string
      description: string
    }) =>
      updateCategory(id, {
        name,
        description,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      })
    },
  })

  return {
    createMutation,
    updateMutation,
    deleteMutation,
  }
}