import type { CategoryListResponse } from '../../types/category'

export const categoryData: CategoryListResponse = {
  total: 4,
  categories: [
    {
      id: '1',
      name: 'Projects',
      description: 'Project-related documents',
      documentCount: 2,
    },
    {
      id: '2',
      name: 'HR',
      description: 'Human resource documents',
      documentCount: 1,
    },
    {
      id: '3',
      name: 'Technical',
      description: 'Technical and development documents',
      documentCount: 2,
    },
    {
      id: '4',
      name: 'Reports',
      description: 'Business and monthly reports',
      documentCount: 1,
    },
  ],
}
