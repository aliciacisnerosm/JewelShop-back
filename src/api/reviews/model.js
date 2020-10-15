import mongoose, { Schema } from 'mongoose'

const reviewsSchema = new Schema({
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String
  },
  text: {
    type: String
  },
  rating: {
    type: String
  },
  product: {
    type: Schema.ObjectId,
    ref: 'Product'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

reviewsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdBy: this.createdBy.view(full),
      title: this.title,
      text: this.text,
      rating: this.rating,
      product: this.product,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Reviews', reviewsSchema)

export const schema = model.schema
export default model
