import { success, notFound } from '../../services/response/'
import { Product } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Product.create(body)
    .then((product) => product.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Product.find(query, select, cursor)
    .then((products) => products.map((product) => product.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? product.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? Object.assign(product, body).save() : null)
    .then((product) => product ? product.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Product.findById(params.id)
    .then(notFound(res))
    .then((product) => product ? product.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const getProducts = ({ querymen: { query, select, cursor } }, res, next) =>
  Product.find({ 'isShown': true })
  .then((products) => products.map((product) => product.view()))
  .then(success(res))
  .catch(next)

export const getRecommended = ({ params }, res, next) =>
  Product.find({ '_id': { $ne: params.id }, 'category': params.category })
    .limit(4)
    .then(notFound(res))
    .then((products) => products.map((product) => product.view()))
    .then(success(res))
    .catch(next)

export const getCart = ({ bodymen: { body } }, res, next) =>
  Product.find({'_id': { $in: res.req.body }})
    .then(notFound(res))
    .then((products) => products.map((product) => product.view()))
    .then(success(res))
    .catch(next)

// Helper function
export const buyProducts = (res, next, orderID, ipnID, stripeID) => {
  Order.findById(orderID)
    .then(notFound(res))
    .then((orderFound) => {
      orderFound.items.forEach((item) => {
        Product.updateOne({ _id: item.product, 'variations._id': item.variation }, { $inc: { 'variations.$.stock': item.quantity * (-1) } }) // This query reduces the stock by the customerr's bought quantity
          .then((result) => 'Updated')
      })
      if (ipnID) {
        Order.updateOne({ _id: orderID }, { $set: { ipn: ipnID }})
          .then((result) => 'Updated')
      } else if (stripeID) {
        Order.updateOne({ _id: orderID }, { $set: { stripeEvent: stripeID }})
        .then((result) => 'Updated')
      }
      
    })
    .catch(next)
}