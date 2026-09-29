import { useQuery } from '@tanstack/react-query'
import { getDocuments } from '../services/api/documentApi'

export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: getDocuments,
  })
}