import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Order } from '.'

const app = () => express(apiRoot, routes)

let order

beforeEach(async () => {
  order = await Order.create({})
})

test('POST /orders 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ type: 'test', subtotal: 'test', shippingInfo: 'test', shippingCost: 'test', items: 'test', isHidden: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.type).toEqual('test')
  expect(body.subtotal).toEqual('test')
  expect(body.shippingInfo).toEqual('test')
  expect(body.shippingCost).toEqual('test')
  expect(body.items).toEqual('test')
  expect(body.isHidden).toEqual('test')
})

test('GET /orders 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /orders/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${order.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(order.id)
})

test('GET /orders/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /orders/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${order.id}`)
    .send({ type: 'test', subtotal: 'test', shippingInfo: 'test', shippingCost: 'test', items: 'test', isHidden: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(order.id)
  expect(body.type).toEqual('test')
  expect(body.subtotal).toEqual('test')
  expect(body.shippingInfo).toEqual('test')
  expect(body.shippingCost).toEqual('test')
  expect(body.items).toEqual('test')
  expect(body.isHidden).toEqual('test')
})

test('PUT /orders/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ type: 'test', subtotal: 'test', shippingInfo: 'test', shippingCost: 'test', items: 'test', isHidden: 'test' })
  expect(status).toBe(404)
})

test('DELETE /orders/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${order.id}`)
  expect(status).toBe(204)
})

test('DELETE /orders/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
