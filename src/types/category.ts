export interface Category {
  id: string
  name: string
  description: string
  documentCount: number
}

export interface CategoryListResponse {
  categories: Category[]
  total: number
}