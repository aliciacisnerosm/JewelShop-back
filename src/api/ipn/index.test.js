import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Ipn } from '.'

const app = () => express(apiRoot, routes)

let ipn

beforeEach(async () => {
  ipn = await Ipn.create({})
})

test('POST /ipns 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ txn_id: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.txn_id).toEqual('test')
})

test('GET /ipns 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /ipns/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${ipn.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(ipn.id)
})

test('GET /ipns/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /ipns/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${ipn.id}`)
    .send({ txn_id: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(ipn.id)
  expect(body.txn_id).toEqual('test')
})

test('PUT /ipns/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ txn_id: 'test' })
  expect(status).toBe(404)
})

test('DELETE /ipns/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${ipn.id}`)
  expect(status).toBe(204)
})

test('DELETE /ipns/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
