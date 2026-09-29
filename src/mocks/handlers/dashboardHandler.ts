import { http, HttpResponse } from 'msw'
import { documentData } from '../data/documentData'

export const dashboardHandlers = [
  http.get('/api/dashboard', () => {
    const totalDocuments = documentData.documents.length

    const storageUsed = documentData.documents.reduce(
      (total, document) => total + document.size,
      0,
    )

    const favoriteDocuments = documentData.documents.filter(
      (document) => document.isFavorite,
    ).length

    const sharedDocuments = 24

    const recentDocuments = [...documentData.documents]
      .sort((a, b) =>
        b.modifiedAt.localeCompare(a.modifiedAt),
      )
      .slice(0, 5)
      .map((document) => ({
        id: document.id,
        name: document.name,
        category: document.category,
        modifiedAt: document.modifiedAt,
      }))

    return HttpResponse.json({
      stats: {
        totalDocuments,
        storageUsed: Number(storageUsed.toFixed(2)),
        favoriteDocuments,
        sharedDocuments,
      },
      recentDocuments,
    })
  }),
]