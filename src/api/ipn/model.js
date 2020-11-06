import mongoose, { Schema } from 'mongoose'

const ipnSchema = new Schema({
  txn_id: {
    type: String
  },
  parent_txn_id: {
    type: String
  },
  txn_type: {
    type: String
  },
  payer_id: {
    type: String
  },
  invoice: {
    type: String
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  payer_email: {
    type: String
  },
  auth_amount: {
    type: String
  },
  auth_id: {
    type: String
  },
  exchange_rate: {
    type: String
  },
  mc_currency: {
    type: String
  },
  mc_fee: {
    type: String
  },
  mc_gross: {
    type: String
  },
  quantity: {
    type: String
  },
  payment_date: {
    type: String
  },
  payment_status: {
    type: String
  },
  payment_type: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

ipnSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      txn_id: this.txn_id,
      parent_txn_id: this.parent_txn_id,
      txn_type: this.txn_type,
      payer_id: this.payer_id,
      invoice: this.invoice,
      first_name: this.first_name,
      last_name: this.last_name,
      payer_email: this.payer_email,
      auth_amount: this.auth_amount,
      auth_id: this.auth_id,
      exchange_rate: this.exchange_rate,
      mc_currency: this.mc_currency,
      mc_fee: this.mc_fee,
      mc_gross: this.mc_gross,
      quantity: this.quantity,
      payment_date: this.payment_date,
      payment_status: this.payment_status,
      payment_type: this.payment_type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Ipn', ipnSchema)

export const schema = model.schema
export default model
