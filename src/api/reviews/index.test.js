import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Reviews } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, reviews

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  reviews = await Reviews.create({ createdBy: user })
})

test('POST /reviews 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, title: 'test', text: 'test', rating: 'test', product: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.text).toEqual('test')
  expect(body.rating).toEqual('test')
  expect(body.product).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('POST /reviews 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /reviews 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /reviews/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${reviews.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reviews.id)
})

test('GET /reviews/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /reviews/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${reviews.id}`)
    .send({ access_token: userSession, title: 'test', text: 'test', rating: 'test', product: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reviews.id)
  expect(body.title).toEqual('test')
  expect(body.text).toEqual('test')
  expect(body.rating).toEqual('test')
  expect(body.product).toEqual('test')
  expect(typeof body.createdBy).toEqual('object')
})

test('PUT /reviews/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${reviews.id}`)
    .send({ access_token: anotherSession, title: 'test', text: 'test', rating: 'test', product: 'test' })
  expect(status).toBe(401)
})

test('PUT /reviews/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${reviews.id}`)
  expect(status).toBe(401)
})

test('PUT /reviews/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, title: 'test', text: 'test', rating: 'test', product: 'test' })
  expect(status).toBe(404)
})

test('DELETE /reviews/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reviews.id}`)
  expect(status).toBe(204)
})

test('DELETE /reviews/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
