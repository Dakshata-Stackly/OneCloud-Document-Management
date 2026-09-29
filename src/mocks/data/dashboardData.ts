import type { DashboardData } from '../../types/dashboard'

export const dashboardData: DashboardData = {
  stats: {
    totalDocuments: 128,
    storageUsed: 4.7,
    favoriteDocuments: 12,
    sharedDocuments: 24,
  },
  recentDocuments: [
    {
      id: '1',
      name: 'Project Requirements.pdf',
      category: 'Projects',
      modifiedAt: '2026-09-24',
    },
    {
      id: '2',
      name: 'Employee Handbook.docx',
      category: 'HR',
      modifiedAt: '2026-09-23',
    },
    {
      id: '3',
      name: 'Cloud Architecture.pdf',
      category: 'Technical',
      modifiedAt: '2026-09-22',
    },
    {
      id: '4',
      name: 'Monthly Report.xlsx',
      category: 'Reports',
      modifiedAt: '2026-09-21',
    },
  ],
}