import { useQuery } from '@tanstack/react-query'
import { getDocumentById } from '../services/api/documentApi'

export const useDocument = (id: string) => {
  return useQuery({
    queryKey: ['document', id],
    queryFn: () => getDocumentById(id),
    enabled: Boolean(id),
  })
}