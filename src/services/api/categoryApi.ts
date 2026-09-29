import axios from 'axios'
import type {
  Category,
  CategoryListResponse,
} from '../../types/category'

export const getCategories = async (): Promise<CategoryListResponse> => {
  const response = await axios.get<CategoryListResponse>(
    '/api/categories',
  )

  return response.data
}

export const createCategory = async (
  category: Omit<Category, 'id' | 'documentCount'>,
): Promise<Category> => {
  const response = await axios.post<Category>(
    '/api/categories',
    category,
  )

  return response.data
}

export const updateCategory = async (
  id: string,
  category: Omit<Category, 'id' | 'documentCount'>,
): Promise<Category> => {
  const response = await axios.put<Category>(
    `/api/categories/${id}`,
    category,
  )

  return response.data
}

export const deleteCategory = async (id: string): Promise<void> => {
  await axios.delete(`/api/categories/${id}`)
}