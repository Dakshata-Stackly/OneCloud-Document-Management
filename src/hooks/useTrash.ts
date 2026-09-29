import { useQuery } from '@tanstack/react-query'
import { getTrashDocuments } from '../services/api/trashApi'

export const useTrash = () => {
  return useQuery({
    queryKey: ['trash'],
    queryFn: getTrashDocuments,
  })
}