export interface FavoriteDocument {
  id: string
  name: string
  category: string
  fileType: string
  size: number
  modifiedAt: string
}

export interface FavoriteListResponse {
  documents: FavoriteDocument[]
  total: number
}