import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  toggleFavorite,
  renameDocument,
  deleteDocument,
  downloadDocument,
} from '../services/api/documentApi'

export const useDocumentMutations = () => {
  const queryClient = useQueryClient()

  const favoriteMutation = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents'],
      })

      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      })

      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      })
    },
  })

  const renameMutation = useMutation({
    mutationFn: ({
      id,
      name,
    }: {
      id: string
      name: string
    }) => renameDocument(id, name),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['documents'],
      })

      queryClient.invalidateQueries({
        queryKey: ['document', variables.id],
      })

      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      })

      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteDocument,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ['documents'],
      })

      queryClient.invalidateQueries({
        queryKey: ['document', id],
      })

      queryClient.invalidateQueries({
        queryKey: ['trash'],
      })

      queryClient.invalidateQueries({
        queryKey: ['favorites'],
      })

      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      })
    },
  })

  const downloadMutation = useMutation({
    mutationFn: downloadDocument,
    onSuccess: (blob, id) => {
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = `document-${id}.txt`

      document.body.appendChild(link)
      link.click()

      link.remove()
      window.URL.revokeObjectURL(url)
    },
  })

  return {
    favoriteMutation,
    renameMutation,
    deleteMutation,
    downloadMutation,
  }
}