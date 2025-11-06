const mongoose = require('mongoose');

const OrderItemSchema = new mongoose.Schema({
  productId: String,
  title: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  items: [OrderItemSchema],
  amount_total: { type: Number, default: 0 }, 
  currency: { type: String, default: 'usd' },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'canceled'],
    default: 'pending',
  },
  stripeSessionId: String,
  stripePaymentIntentId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

OrderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
