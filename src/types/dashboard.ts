export interface DashboardStats {
  totalDocuments: number
  storageUsed: number
  favoriteDocuments: number
  sharedDocuments: number
}

export interface RecentDocument {
  id: string
  name: string
  category: string
  modifiedAt: string
}

export interface DashboardData {
  stats: DashboardStats
  recentDocuments: RecentDocument[]
}