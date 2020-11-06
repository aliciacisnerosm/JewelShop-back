import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { StripeEvent } from '.'

const app = () => express(apiRoot, routes)

let stripeEvent

beforeEach(async () => {
  stripeEvent = await StripeEvent.create({})
})

test('POST /stripe-events 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ object: 'test', api_version: 'test', created: 'test', data: 'test', livemode: 'test', pending_webhooks: 'test', request: 'test', type: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.object).toEqual('test')
  expect(body.api_version).toEqual('test')
  expect(body.created).toEqual('test')
  expect(body.data).toEqual('test')
  expect(body.livemode).toEqual('test')
  expect(body.pending_webhooks).toEqual('test')
  expect(body.request).toEqual('test')
  expect(body.type).toEqual('test')
})

test('GET /stripe-events 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /stripe-events/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${stripeEvent.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(stripeEvent.id)
})

test('GET /stripe-events/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /stripe-events/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${stripeEvent.id}`)
    .send({ object: 'test', api_version: 'test', created: 'test', data: 'test', livemode: 'test', pending_webhooks: 'test', request: 'test', type: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(stripeEvent.id)
  expect(body.object).toEqual('test')
  expect(body.api_version).toEqual('test')
  expect(body.created).toEqual('test')
  expect(body.data).toEqual('test')
  expect(body.livemode).toEqual('test')
  expect(body.pending_webhooks).toEqual('test')
  expect(body.request).toEqual('test')
  expect(body.type).toEqual('test')
})

test('PUT /stripe-events/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ object: 'test', api_version: 'test', created: 'test', data: 'test', livemode: 'test', pending_webhooks: 'test', request: 'test', type: 'test' })
  expect(status).toBe(404)
})

test('DELETE /stripe-events/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${stripeEvent.id}`)
  expect(status).toBe(204)
})

test('DELETE /stripe-events/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
