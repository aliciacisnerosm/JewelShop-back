import { StripeEvent } from '.'

let stripeEvent

beforeEach(async () => {
  stripeEvent = await StripeEvent.create({ object: 'test', api_version: 'test', created: 'test', data: 'test', livemode: 'test', pending_webhooks: 'test', request: 'test', type: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = stripeEvent.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(stripeEvent.id)
    expect(view.object).toBe(stripeEvent.object)
    expect(view.api_version).toBe(stripeEvent.api_version)
    expect(view.created).toBe(stripeEvent.created)
    expect(view.data).toBe(stripeEvent.data)
    expect(view.livemode).toBe(stripeEvent.livemode)
    expect(view.pending_webhooks).toBe(stripeEvent.pending_webhooks)
    expect(view.request).toBe(stripeEvent.request)
    expect(view.type).toBe(stripeEvent.type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = stripeEvent.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(stripeEvent.id)
    expect(view.object).toBe(stripeEvent.object)
    expect(view.api_version).toBe(stripeEvent.api_version)
    expect(view.created).toBe(stripeEvent.created)
    expect(view.data).toBe(stripeEvent.data)
    expect(view.livemode).toBe(stripeEvent.livemode)
    expect(view.pending_webhooks).toBe(stripeEvent.pending_webhooks)
    expect(view.request).toBe(stripeEvent.request)
    expect(view.type).toBe(stripeEvent.type)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
