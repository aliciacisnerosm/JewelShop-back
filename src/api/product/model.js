import mongoose, { Schema } from 'mongoose'
import { ObjectID } from 'mongoose/lib/schema/index'

const productSchema = new Schema({
  name: {
    type: String
  },
  pictures: [{
    src: {
      type: String,
      default: 'https://i.pinimg.com/originals/06/7e/f9/067ef929f34b75d61f7e492b0f0ec387.jpg'
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
    type: String
  },
  tags: [String],
  bajoPedido: {
    type: Boolean
  },
  variations: [{
    typeProduct: String,
    unit: String,
    price: Number,
    discount: Number,
    stock: Number
  }],
  indexPictures: {
    type: Number,
    default: 0
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
      bajoPedido: this.bajoPedido,
      variations: this.variations,
      indexPictures: this.indexPictures,
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
