import mongoose, { Schema } from 'mongoose'

const orderSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  type: {
    type: String
  },
  subtotal: {
    type: Number
  },
  total: {
    type: Number
  },
  shippingInfo: {
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    state: String,
    country: String,
    zipcode: String,
    phone: String
  },
  shippingCost: {
    type: Number
  },
  items: [{
    product: {
      type: Schema.ObjectId,
      ref: 'Product',
      required: true
    },
    variation: {
      type: Schema.ObjectId,
      ref: 'Variation',
      required: true
    },
    price: Number,
    quantity: Number,
    typeProduct: String
  }],
  totalQuantity: {
    type: Number
  },
  isHidden: {
    type: Boolean
  },
  ipn: {
    type: Schema.ObjectId,
    ref: 'Ipn',
    default: null
  },
  stripeSession: {
    type: String
  },
  stripeIntent: {
    type: String
  },
  stripeEvent: {
    type: Schema.ObjectId,
    ref: 'Stripe-event',
    default: null
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

orderSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      type: this.type,
      subtotal: this.subtotal,
      total: this.total,
      shippingInfo: this.shippingInfo,
      shippingCost: this.shippingCost,
      items: this.items,
      totalQuantity: this.totalQuantity,
      isHidden: this.isHidden,
      ipn: this.ipn,
      stripeSession: this.stripeSession,
      stripeIntent: this.stripeIntent,
      stripeEvent: this.stripeEvent,
      createdBy: this.createdBy,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Order', orderSchema)

export const schema = model.schema
export default model
