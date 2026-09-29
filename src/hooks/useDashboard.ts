import { useQuery } from '@tanstack/react-query'
import { getDashboardData } from '../services/api/dashboardApi'

export const useDashboard = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboardData,
  })
}