const Order = require('../models/Order');

async function createOrder({
  email,
  items,
  amount_total,
  currency,
  stripeSessionId,
}) {
  const order = new Order({
    email,
    items,
    amount_total,
    currency,
    stripeSessionId,
    status: 'pending',
  });
  return order.save();
}

async function updateOrderBySession(sessionId, updates) {
  return Order.findOneAndUpdate(
    { stripeSessionId: sessionId },
    { ...updates, updatedAt: Date.now() },
    { new: true }
  );
}

async function findOrderBySession(sessionId) {
  return Order.findOne({ stripeSessionId: sessionId });
}

module.exports = {
  createOrder,
  updateOrderBySession,
  findOrderBySession,
};
