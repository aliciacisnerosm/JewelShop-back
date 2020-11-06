import { success, notFound } from '../../services/response/'
import { Ipn } from '.'
import { Order } from '../order'
import { Product } from '../product'
import { buyProducts } from '../product/controller'
import request from 'request'

export const create = ({ bodymen: { body } }, res, next) =>
  Ipn.create(body)
    .then((dbDocument) => {
      let isValidIPN = false
      res.sendStatus(200)
      console.log('RECEIVED IPN FROM PAYPAL:')
      console.log(res.req.body)
      console.log('What was posted:')
      console.log(dbDocument)

      let postreq = 'cmd=_notify-validate'

      // Iterate the original request payload object and prepend its keys and values to the post string
      Object.keys(res.req.body).map((key) => {
        postreq = `${postreq}&${key}=${res.req.body[key]}`
        return key
      })

      const options = {
        // url: 'https://ipnpb.paypal.com/cgi-bin/webscr', // production
        url: 'https://www.sandbox.paypal.com/cgi-bin/webscr', // sandbox
        method: 'POST',
        headers: {
          'Content-Length': postreq.length
        },
        encoding: 'utf-8',
        body: postreq
      }

      // Request to paypal to verify authenticity of IPN request
      request(options, (error, response, resBody) => {
        if (error || response.statusCode !== 200) {
          reject(new Error(error))
          return
        }

        // Validate the response from PayPal and resolve / reject the promise.
        if (resBody.substring(0, 8) === 'VERIFIED') {
          // resolve(true)
          isValidIPN = true
          console.log('PAYPAL IPN OBJECT: ', resBody)
        } else if (resBody.substring(0, 7) === 'INVALID') {
          console.log('IPN Message is invalid.')
          console.log(resBody)
        } else {
          console.log('Unexpected response body.')
          console.log('URB error: ', new Error(error))
        }

        /*
          ipn invoice field content
          // t, type of order ('p' for products, 's' for subscriptions)
          {
            "t":"p",
            "oId":"5df0116749e01f32dcacedda",
            "uId":"5df7a97a51d3a3386875c945"
          }
        */
        console.log(JSON.parse(body.invoice))
        let orderID = (JSON.parse(body.invoice)).oId
        let userID = (JSON.parse(body.invoice)).uId
        let internalIPNType = (JSON.parse(body.invoice)).t
        
        // Insert this if into a function or inside body.payment_status === completed for production
        // Do something with validation
        if (isValidIPN && body.payment_status === 'Completed') {
          // if IPN is a request for buying a subscription
          if (internalIPNType === 's') { 
            // buySubscription()
            console.log('In development...')
          } else if (internalIPNType === 'p') { // Else if request is for buying products
            console.log('Buying products')
            buyProducts(res, next, orderID, dbDocument._id, null)
            sendReceiptMail(orderID, res, next)
          }
        } else {
          // To add later: capture email and IP of user who triggered an invalid switch
          console.log('IPN invalid so no switch')
        }
      })
    })
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Ipn.find(query, select, cursor)
    .then((ipns) => ipns.map((ipn) => ipn.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Ipn.findById(params.id)
    .then(notFound(res))
    .then((ipn) => ipn ? ipn.view() : null)
    .then(success(res))
    .catch(next)
