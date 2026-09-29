export interface Document {
  id: string
  name: string
  category: string
  fileType: string
  size: number
  status: string
  description: string
  tags: string[]
  isFavorite: boolean
  modifiedAt: string
}

export interface DocumentListResponse {
  documents: Document[]
  total: number
}