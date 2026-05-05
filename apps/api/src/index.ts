import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const schema = z.object({
  name: z.string(),
  price: z.number(),
  stock: z.number(),
})

type Product = z.infer<typeof schema> & { id: number }


const products: Product[] = [
  { id: 1, name: 'Tシャツ', price: 2980, stock: 100 },
  { id: 2, name: 'デニムパンツ', price: 7980, stock: 50 },
  { id: 3, name: 'スニーカー', price: 5480, stock: 30 },
]

const app = new Hono()

const routes = app
  .get('/api/products', (c) => {
    return c.json(products)
  })
  .get('/api/products/:id', (c) => {
    const id = Number(c.req.param('id'))
    const product = products.find((p) => p.id === id)
    if (!product) return c.json({ message: 'Not found' }, 404)
    return c.json(product)
  })
  .post('/api/products', zValidator('json', schema), async (c) => {
    const body = c.req.valid('json')
    const newProduct = { id: products.length + 1, ...body }
    products.push(newProduct)
    return c.json(newProduct, 201)
  })

export type AppType = typeof routes

export default {
  port: 3001,
  fetch: app.fetch,
}
