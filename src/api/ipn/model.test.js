import { Ipn } from '.'

let ipn

beforeEach(async () => {
  ipn = await Ipn.create({ txn_id: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = ipn.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ipn.id)
    expect(view.txn_id).toBe(ipn.txn_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = ipn.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(ipn.id)
    expect(view.txn_id).toBe(ipn.txn_id)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
