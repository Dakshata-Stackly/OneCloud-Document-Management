import type { TrashListResponse } from '../../types/trash'

export const trashData: TrashListResponse = {
  total: 2,
  documents: [
    {
      id: '7',
      name: 'Old Project Plan.pdf',
      category: 'Projects',
      fileType: 'PDF',
      size: 1.6,
      deletedAt: '2026-09-25',
    },
    {
      id: '8',
      name: 'Previous Report.xlsx',
      category: 'Reports',
      fileType: 'XLSX',
      size: 2.3,
      deletedAt: '2026-09-24',
    },
  ],
}