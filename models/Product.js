import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String },
  description: { type: String },
  price: { type: Number },
}, { collection: "eShop" }); // 👈 Important: yahan collection explicitly mention hai

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default Product;













// import mongoose from "mongoose";

// const EshopSchema = new mongoose.Schema({
//   title: String,
//   image: String,
//   description: String,
//   price: Number,
// }, { timestamps: true });

// const eShop = mongoose.models.eShop || mongoose.model('eShop', EshopSchema);

// export default eShop;















// // import { Description } from "@mui/icons-material";
// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//   title: String,
//   image: String,
//   Description: String,
//   price: Number
// });

// export default mongoose.models.Product || mongoose.model("Product", productSchema);
