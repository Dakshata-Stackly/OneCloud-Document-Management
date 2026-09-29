export interface TrashDocument {
  id: string
  name: string
  category: string
  fileType: string
  size: number
  deletedAt: string
}

export interface TrashListResponse {
  documents: TrashDocument[]
  total: number
}