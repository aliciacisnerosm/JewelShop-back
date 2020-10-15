import { Product } from '.'

let product

beforeEach(async () => {
  product = await Product.create({ name: 'test', pictures: 'test', description: 'test', isShown: 'test', category: 'test', tags: 'test', stock: 'test', bajoPedido: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = product.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.name).toBe(product.name)
    expect(view.pictures).toBe(product.pictures)
    expect(view.description).toBe(product.description)
    expect(view.isShown).toBe(product.isShown)
    expect(view.category).toBe(product.category)
    expect(view.tags).toBe(product.tags)
    expect(view.stock).toBe(product.stock)
    expect(view.bajoPedido).toBe(product.bajoPedido)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = product.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(product.id)
    expect(view.name).toBe(product.name)
    expect(view.pictures).toBe(product.pictures)
    expect(view.description).toBe(product.description)
    expect(view.isShown).toBe(product.isShown)
    expect(view.category).toBe(product.category)
    expect(view.tags).toBe(product.tags)
    expect(view.stock).toBe(product.stock)
    expect(view.bajoPedido).toBe(product.bajoPedido)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
