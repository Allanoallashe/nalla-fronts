
import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  title: {type:String, required:true},
  description : {type: String},
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  properties: {type:Object}
}, {
  timestamps: true,
});

let Product;

try {
    Product = mongoose.model('Product')
} catch(err) {
    Product = model('Product', ProductSchema)
}
  
export default Product