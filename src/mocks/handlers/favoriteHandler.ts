import { http, HttpResponse } from 'msw'
import { favoriteData } from '../data/favoriteData'
import { documentData } from '../data/documentData'

export const favoriteHandlers = [
  http.get('/api/favorites', () => {
    return HttpResponse.json(favoriteData)
  }),

  http.delete('/api/favorites/:id', ({ params }) => {
    const index = favoriteData.documents.findIndex(
      (document) => document.id === params.id,
    )

    if (index === -1) {
      return HttpResponse.json(
        { message: 'Favorite document not found' },
        { status: 404 },
      )
    }

    const document = documentData.documents.find(
      (item) => item.id === params.id,
    )

    if (document) {
      document.isFavorite = false
    }

    favoriteData.documents.splice(index, 1)
    favoriteData.total -= 1

    return new HttpResponse(null, { status: 204 })
  }),
]