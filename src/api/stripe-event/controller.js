import { success, notFound } from '../../services/response/'
import { StripeEvent } from '.'
import { buyProducts } from '../product/controller'
import { Order } from '../order'
import { sendReceiptMail } from '../order/controller'

const testWebhookSecret = 'whsec_KQ9s4VMUibxvjTbvVCOkwB2uFEbEMPMs'
const stripe = require('stripe')('sk_test_51HkH7OKn4JRxfLpqWd3z3Ywcg0NwZj3SuyptmqHCra5JupYRzndTukF7UmxjCihzkxOMTRkIdXXTwHPDJVJp9KfD00GZjmZlWn')

export const create = (req, res, next) => {
  if (verifySignature(req.headers['stripe-signature'], req.rawBody)) {
    if (req.body.type === 'charge.succeeded') {
      chargeSucceededEvent(req.body, res, next)
    } else {
      console.log('Unhandled stripe event: \x1b[35m%s\x1b[0m', req.body.type)
      res.sendStatus(401)
    }
  } else {
    console.log('\x1b[31m%s%s\x1b[0m', 'WARNING - Non-verified request or duplicate: ', req.body.request.id)
    res.sendStatus(403)
  }
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  StripeEvent.find(query, select, cursor)
    .then((stripeEvents) => stripeEvents.map((stripeEvent) => stripeEvent.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  StripeEvent.findById(params.id)
    .then(notFound(res))
    .then((stripeEvent) => stripeEvent ? stripeEvent.view() : null)
    .then(success(res))
    .catch(next)

const verifySignature = (signature, body) => {
  let event
  try {
    event = stripe.webhooks.constructEvent(body, signature, testWebhookSecret)
    return true
  }
  catch (err) {
    console.log(err.message)
    return false
  }
}

const chargeSucceededEvent = (body, res, next) => {
  StripeEvent.findOne({ 'request.id': body.request.id})
    .then((foundEvent) => {
      if (!foundEvent) {
        StripeEvent.create(body)
          .then((stripeEvent) => {
            console.log('\x1b[35m%s\x1b[0m', 'Charge successful for customer: ', stripeEvent.data.object.billing_details.email)
            res.sendStatus(201)
            return stripeEvent
          })
          .then((stripeEvent) => {
            // Look for payment intent match in orders, then, use that order's id for buyProducts
            Order.findOne({ 'stripeIntent': stripeEvent.data.object.payment_intent })
              .then(orderFound => {
                buyProducts(res, next, orderFound._id, null, stripeEvent._id)
                // sendReceiptMail(orderFound._id, res, next)
              })
          })
      } else {
        console.log('Event already exists, return 200')
        res.sendStatus(200)
      }
    })
}