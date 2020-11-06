import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show } from './controller'
import { schema } from './model'
export StripeEvent, { schema } from './model'

const router = new Router()
const { object, api_version, created, data, livemode, pending_webhooks, request, type } = schema.tree

/**
 * @api {post} /stripe-events Create stripe event
 * @apiName CreateStripeEvent
 * @apiGroup StripeEvent
 * @apiParam object Stripe event's object.
 * @apiParam api_version Stripe event's api_version.
 * @apiParam created Stripe event's created.
 * @apiParam data Stripe event's data.
 * @apiParam livemode Stripe event's livemode.
 * @apiParam pending_webhooks Stripe event's pending_webhooks.
 * @apiParam request Stripe event's request.
 * @apiParam type Stripe event's type.
 * @apiSuccess {Object} stripeEvent Stripe event's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Stripe event not found.
 */
router.post('/',
  create)

/**
 * @api {get} /stripe-events Retrieve stripe events
 * @apiName RetrieveStripeEvents
 * @apiGroup StripeEvent
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} stripeEvents List of stripe events.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /stripe-events/:id Retrieve stripe event
 * @apiName RetrieveStripeEvent
 * @apiGroup StripeEvent
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} stripeEvent Stripe event's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Stripe event not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

export default router
