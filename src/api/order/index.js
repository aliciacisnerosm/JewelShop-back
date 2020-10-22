import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, showOrdersByUser, update, destroy, calculatePrice } from './controller'
import { schema } from './model'
export Order, { schema } from './model'

const router = new Router()
const { type, subtotal, total, shippingInfo, shippingCost, items, totalQuantity, isHidden, ipn, stripeSession, stripeIntent, stripeEvent, createdBy } = schema.tree

/**
 * @api {post} /orders Create order
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiParam type Order's type.
 * @apiParam subtotal Order's subtotal.
 * @apiParam shippingInfo Order's shippingInfo.
 * @apiParam shippingCost Order's shippingCost.
 * @apiParam items Order's items.
 * @apiParam isHidden Order's isHidden.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.post('/',
  token({ required: true }),
  body({ type, subtotal, total, shippingInfo, shippingCost, items, totalQuantity, isHidden, createdBy }),
  create)

/**
 * @api {get} /orders Retrieve orders
 * @apiName RetrieveOrders
 * @apiGroup Order
 * @apiUse listParams
 * @apiSuccess {Object[]} orders List of orders.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /orders/:id Retrieve order
 * @apiName RetrieveOrder
 * @apiGroup Order
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.get('/:id',
  token({ required: true, roles: ['admin', 'user'] }),
  show)

/**
 * @api {get} /orders/:userId Retrieve orders by userId
 * @apiName RetrieveOrdersByUserId
 * @apiGroup Order
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 * @apiError 401 user access only.
 */
router.get('/getOrdersByUser/:userId',
  token({ required: true, roles: ['admin', 'user'] }),
  showOrdersByUser)

// Get order true price
router.get('/price/:id',
  token({ required: true }),
  calculatePrice)

/**
 * @api {put} /orders/:id Update order
 * @apiName UpdateOrder
 * @apiGroup Order
 * @apiParam type Order's type.
 * @apiParam subtotal Order's subtotal.
 * @apiParam shippingInfo Order's shippingInfo.
 * @apiParam shippingCost Order's shippingCost.
 * @apiParam items Order's items.
 * @apiParam isHidden Order's isHidden.
 * @apiSuccess {Object} order Order's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Order not found.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ type, subtotal, total, shippingInfo, shippingCost, items, totalQuantity, isHidden, createdBy }),
  update)

/**
 * @api {delete} /orders/:id Delete order
 * @apiName DeleteOrder
 * @apiGroup Order
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Order not found.
 */
router.delete('/:id',
  destroy)

export default router
