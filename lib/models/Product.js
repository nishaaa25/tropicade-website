import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
 title: String,
  price: Number,
  image: String,
  category: String,
  sizes: [String],
  colors: [String],
  inStock: Boolean,
  desc: String,
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
