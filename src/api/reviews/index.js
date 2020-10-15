import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Reviews, { schema } from './model'

const router = new Router()
const { title, text, rating, product } = schema.tree

/**
 * @api {post} /reviews Create reviews
 * @apiName CreateReviews
 * @apiGroup Reviews
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Reviews's title.
 * @apiParam text Reviews's text.
 * @apiParam rating Reviews's rating.
 * @apiParam product Reviews's product.
 * @apiSuccess {Object} reviews Reviews's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reviews not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ title, text, rating, product }),
  create)

/**
 * @api {get} /reviews Retrieve reviews
 * @apiName RetrieveReviews
 * @apiGroup Reviews
 * @apiUse listParams
 * @apiSuccess {Object[]} reviews List of reviews.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /reviews/:id Retrieve reviews
 * @apiName RetrieveReviews
 * @apiGroup Reviews
 * @apiSuccess {Object} reviews Reviews's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reviews not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /reviews/:id Update reviews
 * @apiName UpdateReviews
 * @apiGroup Reviews
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Reviews's title.
 * @apiParam text Reviews's text.
 * @apiParam rating Reviews's rating.
 * @apiParam product Reviews's product.
 * @apiSuccess {Object} reviews Reviews's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reviews not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ title, text, rating, product }),
  update)

/**
 * @api {delete} /reviews/:id Delete reviews
 * @apiName DeleteReviews
 * @apiGroup Reviews
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Reviews not found.
 */
router.delete('/:id',
  destroy)

export default router
