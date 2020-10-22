import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Order } from '.'
import { Product } from '../product'
import { getQuotation } from '../product/controller'

export const create = ({ bodymen: { body } }, res, next) =>
  Order.create(body)
    .then((order) => order.view(true))
    .then(success(res, 201))
    .catch(next)

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

      let shipRes = res
      shipRes.req = { body: { zipcode: order.shippingInfo.zipcode } }

      let shippingPromise = getQuotation(res.req.body.zipcode)  
      shippingPromise.then((value) => {
        // console.log('ship:', value)
        if (order.shippingInfo.address !== 'address') {
          res.send({total: totalCost + Number(value)})
        } else {
          res.send({total: totalCost})
        }
      })
      return totalCost
    })
    // .then(success(res))
    .catch(next)