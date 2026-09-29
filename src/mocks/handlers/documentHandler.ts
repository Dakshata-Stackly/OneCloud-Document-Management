import { http, HttpResponse } from 'msw'
import { documentData } from '../data/documentData'
import { trashData } from '../data/trashData'
import { favoriteData } from '../data/favoriteData'

export const documentHandlers = [
  http.get('/api/documents', () => {
    return HttpResponse.json(documentData)
  }),

  http.get('/api/documents/:id', ({ params }) => {
    const document = documentData.documents.find(
      (item) => item.id === params.id,
    )

    if (!document) {
      return HttpResponse.json(
        { message: 'Document not found' },
        { status: 404 },
      )
    }

    return HttpResponse.json(document)
  }),

  http.post('/api/documents/upload', async ({ request }) => {
    const formData = await request.formData()

    const name = formData.get('name')
    const category = formData.get('category')
    const description = formData.get('description')
    const tags = formData.get('tags')
    const file = formData.get('file')

    if (
      typeof name !== 'string' ||
      typeof category !== 'string' ||
      !(file instanceof File)
    ) {
      return HttpResponse.json(
        {
          message: 'Document name, category and file are required',
        },
        { status: 400 },
      )
    }

    const fileExtension =
      file.name.split('.').pop()?.toUpperCase() ?? 'FILE'

    const newDocument = {
      id: crypto.randomUUID(),
      name,
      category,
      fileType: fileExtension,
      size: Number((file.size / (1024 * 1024)).toFixed(2)),
      status: 'Active',
      description:
        typeof description === 'string' ? description : '',
      tags:
        typeof tags === 'string'
          ? tags
              .split(',')
              .map((tag) => tag.trim())
              .filter(Boolean)
          : [],
      isFavorite: false,
      modifiedAt: new Date().toISOString().split('T')[0],
    }

    documentData.documents.unshift(newDocument)
    documentData.total += 1

    return HttpResponse.json(
      {
        message: 'Document uploaded successfully',
        documentId: newDocument.id,
      },
      { status: 201 },
    )
  }),

  http.patch('/api/documents/:id/favorite', ({ params }) => {
    const document = documentData.documents.find(
      (item) => item.id === params.id,
    )

    if (!document) {
      return HttpResponse.json(
        { message: 'Document not found' },
        { status: 404 },
      )
    }

    document.isFavorite = !document.isFavorite

    const favoriteIndex = favoriteData.documents.findIndex(
      (item) => item.id === document.id,
    )

    if (document.isFavorite && favoriteIndex === -1) {
      favoriteData.documents.unshift({
        id: document.id,
        name: document.name,
        category: document.category,
        fileType: document.fileType,
        size: document.size,
        modifiedAt: document.modifiedAt,
      })

      favoriteData.total += 1
    } else if (!document.isFavorite && favoriteIndex !== -1) {
      favoriteData.documents.splice(favoriteIndex, 1)
      favoriteData.total -= 1
    }

    return HttpResponse.json(document)
  }),

  http.patch(
    '/api/documents/:id/rename',
    async ({ params, request }) => {
      const document = documentData.documents.find(
        (item) => item.id === params.id,
      )

      if (!document) {
        return HttpResponse.json(
          { message: 'Document not found' },
          { status: 404 },
        )
      }

      const body = (await request.json()) as {
        name: string
      }

      if (!body.name?.trim()) {
        return HttpResponse.json(
          { message: 'Document name is required' },
          { status: 400 },
        )
      }

      document.name = body.name.trim()
      document.modifiedAt = new Date()
        .toISOString()
        .split('T')[0]

      const favorite = favoriteData.documents.find(
        (item) => item.id === document.id,
      )

      if (favorite) {
        favorite.name = document.name
        favorite.modifiedAt = document.modifiedAt
      }

      return HttpResponse.json(document)
    },
  ),

  http.delete('/api/documents/:id', ({ params }) => {
    const index = documentData.documents.findIndex(
      (item) => item.id === params.id,
    )

    if (index === -1) {
      return HttpResponse.json(
        { message: 'Document not found' },
        { status: 404 },
      )
    }

    const document = documentData.documents[index]

    const favoriteIndex = favoriteData.documents.findIndex(
      (item) => item.id === document.id,
    )

    if (favoriteIndex !== -1) {
      favoriteData.documents.splice(favoriteIndex, 1)
      favoriteData.total -= 1
    }

    trashData.documents.unshift({
      id: document.id,
      name: document.name,
      category: document.category,
      fileType: document.fileType,
      size: document.size,
      deletedAt: new Date().toISOString().split('T')[0],
    })

    trashData.total += 1

    documentData.documents.splice(index, 1)
    documentData.total -= 1

    return new HttpResponse(null, { status: 204 })
  }),

  http.get('/api/documents/:id/download', ({ params }) => {
    const document = documentData.documents.find(
      (item) => item.id === params.id,
    )

    if (!document) {
      return HttpResponse.json(
        { message: 'Document not found' },
        { status: 404 },
      )
    }

    const content = `Mock document: ${document.name}`

    return new HttpResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': `attachment; filename="${document.name}.txt"`,
      },
    })
  }),
]