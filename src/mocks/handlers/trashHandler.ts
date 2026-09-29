import { http, HttpResponse } from 'msw'
import { trashData } from '../data/trashData'
import { documentData } from '../data/documentData'

export const trashHandlers = [
  http.get('/api/trash', () => {
    return HttpResponse.json(trashData)
  }),

  http.post('/api/trash/:id/restore', ({ params }) => {
    const index = trashData.documents.findIndex(
      (document) => document.id === params.id,
    )

    if (index === -1) {
      return HttpResponse.json(
        { message: 'Document not found in trash' },
        { status: 404 },
      )
    }

    const trashDocument = trashData.documents[index]

    const restoredDocument = {
      id: trashDocument.id,
      name: trashDocument.name,
      category: trashDocument.category,
      fileType: trashDocument.fileType,
      size: trashDocument.size,
      status: 'Active',
      description: '',
      tags: [],
      isFavorite: false,
      modifiedAt: new Date().toISOString().split('T')[0],
    }

    documentData.documents.unshift(restoredDocument)
    documentData.total += 1

    trashData.documents.splice(index, 1)
    trashData.total -= 1

    return HttpResponse.json(restoredDocument)
  }),

  http.delete('/api/trash/:id', ({ params }) => {
    const index = trashData.documents.findIndex(
      (document) => document.id === params.id,
    )

    if (index === -1) {
      return HttpResponse.json(
        { message: 'Document not found in trash' },
        { status: 404 },
      )
    }

    trashData.documents.splice(index, 1)
    trashData.total -= 1

    return new HttpResponse(null, { status: 204 })
  }),
]