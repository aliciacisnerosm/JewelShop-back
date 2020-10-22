import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, getProducts, getRecommended, getCart } from './controller'
import { schema } from './model'
export Product, { schema } from './model'

const router = new Router()
const { name, pictures, description, isShown, category, tags, bajoPedido, variations, indexPictures } = schema.tree

/**
 * @api {post} /products Create product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Product's name.
 * @apiParam pictures Product's pictures.
 * @apiParam description Product's description.
 * @apiParam isShown Product's isShown.
 * @apiParam category Product's category.
 * @apiParam tags Product's tags.
 * @apiParam stock Product's stock.
 * @apiParam bajoPedido Product's bajoPedido.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, pictures, description, isShown, category, tags, bajoPedido, variations, indexPictures }),
  create)

/**
 * @api {get} /products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiUse listParams
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /products Retrieve products
 * @apiName RetrieveProducts
 * @apiGroup Product
 * @apiUse listParams
 * @apiSuccess {Object[]} products List of products.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/getProducts',
  query(),
  getProducts)

/**
 * @api {get} /products/:id Retrieve product
 * @apiName RetrieveProduct
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get('/:id',
  show)

/**
 * @api {get} /products/recommended/:id/:category Retrieve product's recommended
 * @apiName RetrieveProduct
 * @apiParam id Product's id.
 * @apiParam category Product's category.
 * @apiGroup Product
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 */
router.get('/recommended/:id/:category',
  getRecommended)

/**
* @api {get} /products/getCark Retrieve product's from cart
* @apiName getCart
* @apiGroup Product
* @apiSuccess {Object} product Product's data.
* @apiError {Object} 400 Some parameters may contain invalid values.
* @apiError 404 Product not found.
*/
router.post('/getCart',
  body({}),
  getCart)

/**
 * @api {put} /products/:id Update product
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Product's name.
 * @apiParam pictures Product's pictures.
 * @apiParam description Product's description.
 * @apiParam isShown Product's isShown.
 * @apiParam category Product's category.
 * @apiParam tags Product's tags.
 * @apiParam stock Product's stock.
 * @apiParam bajoPedido Product's bajoPedido.
 * @apiSuccess {Object} product Product's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Product not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, pictures, description, isShown, category, tags, bajoPedido, variations, indexPictures }),
  update)

/**
 * @api {delete} /products/:id Delete product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Product not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
