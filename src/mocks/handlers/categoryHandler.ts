import { http, HttpResponse } from 'msw'
import { categoryData } from '../data/categoryData'

export const categoryHandlers = [
  http.get('/api/categories', () => {
    return HttpResponse.json(categoryData)
  }),

  http.post('/api/categories', async ({ request }) => {
    const body = (await request.json()) as {
      name: string
      description: string
    }

    const newCategory = {
      id: crypto.randomUUID(),
      name: body.name,
      description: body.description,
      documentCount: 0,
    }

    categoryData.categories.unshift(newCategory)
    categoryData.total += 1

    return HttpResponse.json(newCategory, { status: 201 })
  }),

  http.put('/api/categories/:id', async ({ params, request }) => {
    const body = (await request.json()) as {
      name: string
      description: string
    }

    const category = categoryData.categories.find(
      (item) => item.id === params.id,
    )

    if (!category) {
      return HttpResponse.json(
        { message: 'Category not found' },
        { status: 404 },
      )
    }

    category.name = body.name
    category.description = body.description

    return HttpResponse.json(category)
  }),

  http.delete('/api/categories/:id', ({ params }) => {
    const index = categoryData.categories.findIndex(
      (item) => item.id === params.id,
    )

    if (index === -1) {
      return HttpResponse.json(
        { message: 'Category not found' },
        { status: 404 },
      )
    }

    categoryData.categories.splice(index, 1)
    categoryData.total -= 1

    return new HttpResponse(null, { status: 204 })
  }),
]