import mongoose, { Schema } from 'mongoose'
import { ObjectID } from 'mongoose/lib/schema/index'

const productSchema = new Schema({
  name: {
    type: String
  },
  pictures: [{
    src: {
      type: String,
      default: 'https://i.imgur.com/GMZA8By.jpg'
    },
    extension: {
      type: String,
      default: 'image/jpeg'
    }
  }],
  description: {
    type: String
  },
  isShown: {
    type: Boolean
  },
  category: {
    type: Schema.ObjectId,
    ref: 'Category'
  },
  tags: [String],
  stock: {
    type: Number
  },
  bajoPedido: {
    type: Boolean
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

productSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      pictures: this.pictures,
      description: this.description,
      isShown: this.isShown,
      category: this.category,
      tags: this.tags,
      stock: this.stock,
      bajoPedido: this.bajoPedido,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Product', productSchema)

export const schema = model.schema
export default model
