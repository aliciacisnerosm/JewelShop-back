/* eslint-disable no-unused-vars */
import path from 'path'
import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9090,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    defaultEmail: 'no-reply@jewelshop-back.com',
    sendgridKey: requireProcessEnv('SENDGRID_KEY'),
    masterKey: requireProcessEnv('MASTER_KEY'),
    jwtSecret: requireProcessEnv('JWT_SECRET')
  },
  test: { },
  development: {
    mongo: {
      uri: 'mongodb+srv://admin:admin@cluster0-stprz.mongodb.net/jewelshop-back?retryWrites=true&w=majority', //'mongodb://localhost/jewelshop-back-dev',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 9090,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0-stprz.mongodb.net/jewelshop-back?retryWrites=true&w=majority'
    }
  }
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
