import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  image: String,
  rating: Number,
  price: Number
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
