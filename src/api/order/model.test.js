import { Order } from '.'

let order

beforeEach(async () => {
  order = await Order.create({ type: 'test', subtotal: 'test', shippingInfo: 'test', shippingCost: 'test', items: 'test', isHidden: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = order.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(order.id)
    expect(view.type).toBe(order.type)
    expect(view.subtotal).toBe(order.subtotal)
    expect(view.shippingInfo).toBe(order.shippingInfo)
    expect(view.shippingCost).toBe(order.shippingCost)
    expect(view.items).toBe(order.items)
    expect(view.isHidden).toBe(order.isHidden)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = order.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(order.id)
    expect(view.type).toBe(order.type)
    expect(view.subtotal).toBe(order.subtotal)
    expect(view.shippingInfo).toBe(order.shippingInfo)
    expect(view.shippingCost).toBe(order.shippingCost)
    expect(view.items).toBe(order.items)
    expect(view.isHidden).toBe(order.isHidden)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
