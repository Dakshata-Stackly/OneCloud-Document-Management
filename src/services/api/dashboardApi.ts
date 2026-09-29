import axios from 'axios'
import type { DashboardData } from '../../types/dashboard'

export const getDashboardData = async (): Promise<DashboardData> => {
  const response = await axios.get<DashboardData>('/api/dashboard')

  return response.data
}