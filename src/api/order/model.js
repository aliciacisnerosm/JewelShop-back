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
    price: Number,
    quantity: Number
  }],
  isHidden: {
    type: Boolean
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
      shippingInfo: this.shippingInfo,
      shippingCost: this.shippingCost,
      items: this.items,
      isHidden: this.isHidden,
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
