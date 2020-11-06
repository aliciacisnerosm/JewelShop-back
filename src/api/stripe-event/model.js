import mongoose, { Schema } from 'mongoose'

const stripeEventSchema = new Schema({
  object: {
    type: String
  },
  api_version: {
    type: String
  },
  created: {
    type: Number
  },
  data: {
    object: {
      type: Object
    }
  },
  livemode: {
    type: Boolean
  },
  pending_webhooks: {
    type: Number
  },
  request: {
    id: String,
    idempotency_key: String
  },
  type: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

stripeEventSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      object: this.object,
      api_version: this.api_version,
      created: this.created,
      data: this.data,
      livemode: this.livemode,
      pending_webhooks: this.pending_webhooks,
      request: this.request,
      type: this.type,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('StripeEvent', stripeEventSchema)

export const schema = model.schema
export default model
