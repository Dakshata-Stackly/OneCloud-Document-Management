import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  uploadDocument,
  type UploadDocumentPayload,
} from '../services/api/uploadApi'

export const useUploadDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UploadDocumentPayload) =>
      uploadDocument(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['documents'],
      })

      queryClient.invalidateQueries({
        queryKey: ['dashboard'],
      })

      queryClient.invalidateQueries({
        queryKey: ['categories'],
      })
    },
  })
}