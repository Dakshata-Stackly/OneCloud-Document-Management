import type { FavoriteListResponse } from '../../types/favorite'

export const favoriteData: FavoriteListResponse = {
  total: 3,
  documents: [
    {
      id: '1',
      name: 'Project Requirements.pdf',
      category: 'Projects',
      fileType: 'PDF',
      size: 2.4,
      modifiedAt: '2026-09-24',
    },
    {
      id: '3',
      name: 'Cloud Architecture.pdf',
      category: 'Technical',
      fileType: 'PDF',
      size: 3.2,
      modifiedAt: '2026-09-22',
    },
    {
      id: '6',
      name: 'Team Presentation.pptx',
      category: 'Projects',
      fileType: 'PPTX',
      size: 4.5,
      modifiedAt: '2026-09-19',
    },
  ],
}