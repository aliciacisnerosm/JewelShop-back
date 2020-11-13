import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Order } from '.'
import { Product } from '../product'
import axios from 'axios'
import qs from 'qs'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Order.create({ ...body, createdBy: user })
    .then((order) => order.view(true))
    .then(success(res, 201))
    .catch(next)

// export const create = ({ user, bodymen: { body } }, res, next) =>
//   Order.create({ ...body, createdBy: user })
//     .then((createdOrder) => {
//       let stripePromise = getStripeSession(body.total, createdOrder._id, createdOrder.createdBy.email)
//       stripePromise.then((session) => {
//         createdOrder.stripeSession = session.id
//         createdOrder.stripeIntent = session.intent
//         Order.updateOne({ _id: createdOrder._id }, { stripeSession: session.id, stripeIntent: session.intent })
//           .then((order) => createdOrder.view(true))
//           .then(success(res, 201))
//           .catch(next)
//       })
//     })
//     .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Order.find(query, select, cursor)
    .populate('createdBy')
    .then((orders) => orders.map((order) => order.view()))
    .then(success(res))
    .catch(next)

export const show = ({ user, params }, res, next) =>
  Order.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'createdBy'))
    .then((order) => order ? order.view() : null)
    .then(success(res))
    .catch(next)

export const showOrdersByUser = ({ user, params }, res, next) =>
  Order.find({ createdBy: params.userId })
    .populate('createdBy')
    .then(notFound(res))
    // .then(authorOrAdmin(res, user, 'createdBy'))
    .then((orders) => {
      return orders.filter((order) => order.ipn || order.stripeEvent ? order.view() : null)})
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Order.findById(params.id)
    .populate('createdBy')
    .then(notFound(res))
    .then((order) => order ? Object.assign(order, body).save() : null)
    .then((order) => order ? order.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Order.findById(params.id)
    .then(notFound(res))
    .then((order) => order ? order.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const calculatePrice = ({ params }, res, next) =>
  Order.findById(params.id)
    .populate('items.product')
    .then(notFound(res))
    .then((order) => {
      let totalCost = 0
      order.items.forEach(item => {
        let fullVariation = item.product.variations.find(dbVariation => dbVariation._id.equals(item.variation))
        totalCost += fullVariation.price * item.quantity
      })
      totalCost += order.shippingCost

      let shipRes = res
      shipRes.req = { body: { zipcode: order.shippingInfo.zipcode } }

      // let shippingPromise = getQuotation(res.req.body.zipcode)  
      // shippingPromise.then((value) => {
      //   // console.log('ship:', value)
      //   if (order.shippingInfo.address !== 'address') {
      //     res.send({total: totalCost + Number(value)})
      //   } else {
      //     res.send({total: totalCost})
      //   }
      // })
      res.send({total: totalCost})
      return totalCost
    })
    // .then(success(res))
    .catch(next)

// Standalone promise for getting stripe sessions
export const getStripeSession = (amount, orderId, email) => {
  let promiseSession = new Promise((resolve, reject) => {
    let options = {
      url: 'https://api.stripe.com/v1/checkout/sessions',
      method: 'POST',
      headers: {
        //  sk_test_51HkH7OKn4JRxfLpqWd3z3Ywcg0NwZj3SuyptmqHCra5Ju pYRzndTukF7UmxjCihzkxOMTRkIdXXTwHPDJVJp9KfD00GZjmZlWn
        'Authorization': 'Bearer sk_test_51HkH7OKn4JRxfLpqWd3z3Ywcg0NwZj3SuyptmqHCra5JupYRzndTukF7UmxjCihzkxOMTRkIdXXTwHPDJVJp9KfD00GZjmZlWn',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        success_url: 'https://localthost:8080/#/completedPurchase/' + orderId,
        cancel_url: 'https://localhost:8080/#/confirmation/',
        customer_email: email,
        payment_method_types: ['card'],
        line_items: [{
          name: 'Orden JewelShop',
          quantity: 1,
          currency: 'mxn',
          amount: amount * 100
        }]
      })
    }
    axios(options)
      .then(function (response) {
        let clientResponse = {
          id: response.data.id,
          intent: response.data.payment_intent
        }
        resolve(clientResponse)
      })
      .catch(function (error) {
        console.log('Error ' + error.message)
        console.log('Hehe')
      })
  })
  return promiseSession
}