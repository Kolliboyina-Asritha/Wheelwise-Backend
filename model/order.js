
const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const OrderSchema = new Schema({
  userEmail: {
    type: String,
    required: true
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products' },
      title: String,
      imageUrl: String,
      price: Number,
      quantity: Number
    }
  ],
  buyer: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true }
  },
  shippingMethod: { type: String, default: 'Free Shipping' },
  totalAmount: { type: Number, required: true },
    status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  deliveredAt: {
    type: Date
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema);

