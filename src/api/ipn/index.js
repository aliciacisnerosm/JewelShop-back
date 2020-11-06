import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show } from './controller'
import { schema } from './model'
export Ipn, { schema } from './model'

const router = new Router()
const { txn_id, parent_txn_id, txn_type, payer_id, invoice, first_name, last_name, payer_email, auth_amount, auth_id, exchange_rate, mc_currency, mc_fee, mc_gross, quantity, payment_date, payment_status, payment_type } = schema.tree

/**
 * @api {post} /ipns Create ipn
 * @apiName CreateIpn
 * @apiGroup Ipn
 * @apiParam txn_id Ipn's txn_id.
 * @apiParam parent_txn_id Ipn's parent_txn_id.
 * @apiParam txn_type Ipn's txn_type.
 * @apiParam payer_id Ipn's payer_id.
 * @apiParam invoice Ipn's invoice.
 * @apiParam first_name Ipn's first_name.
 * @apiParam last_name Ipn's last_name.
 * @apiParam payer_email Ipn's payer_email.
 * @apiParam auth_amount Ipn's auth_amount.
 * @apiParam auth_id Ipn's auth_id.
 * @apiParam exchange_rate Ipn's exchange_rate.
 * @apiParam mc_currency Ipn's mc_currency.
 * @apiParam mc_fee Ipn's mc_fee.
 * @apiParam mc_gross Ipn's mc_gross.
 * @apiParam quantity Ipn's quantity.
 * @apiParam payment_date Ipn's payment_date.
 * @apiParam payment_status Ipn's payment_status.
 * @apiParam payment_type Ipn's payment_type.
 * @apiSuccess {Object} ipn Ipn's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ipn not found.
 */
router.post('/',
  body({ txn_id, parent_txn_id, txn_type, payer_id, invoice, first_name, last_name, payer_email, auth_amount, auth_id, exchange_rate, mc_currency, mc_fee, mc_gross, quantity, payment_date, payment_status, payment_type }),
  create)

/**
 * @api {get} /ipns Retrieve ipns
 * @apiName RetrieveIpns
 * @apiGroup Ipn
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} ipns List of ipns.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /ipns/:id Retrieve ipn
 * @apiName RetrieveIpn
 * @apiGroup Ipn
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} ipn Ipn's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Ipn not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

export default router
