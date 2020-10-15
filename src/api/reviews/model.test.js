import { Reviews } from '.'
import { User } from '../user'

let user, reviews

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  reviews = await Reviews.create({ createdBy: user, title: 'test', text: 'test', rating: 'test', product: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = reviews.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reviews.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.title).toBe(reviews.title)
    expect(view.text).toBe(reviews.text)
    expect(view.rating).toBe(reviews.rating)
    expect(view.product).toBe(reviews.product)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = reviews.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(reviews.id)
    expect(typeof view.createdBy).toBe('object')
    expect(view.createdBy.id).toBe(user.id)
    expect(view.title).toBe(reviews.title)
    expect(view.text).toBe(reviews.text)
    expect(view.rating).toBe(reviews.rating)
    expect(view.product).toBe(reviews.product)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
