import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Order, { schema } from './model'

const router = new Router()
const { type, subtotal, shippingInfo, shippingCost, items, isHidden, createdBy } = schema.tree

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
  body({ type, subtotal, shippingInfo, shippingCost, items, isHidden, createdBy }),
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
  show)

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
  body({ type, subtotal, shippingInfo, shippingCost, items, isHidden, createdBy }),
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
