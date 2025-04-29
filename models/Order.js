// /models/Order.js
import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  order_date: { type: Date, default: Date.now },
  orders_data: [
    {
      id: String,
      title: String,
      price: Number,
      image: String,
      quantity: Number,
      total: Number,
    },
  ],
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
