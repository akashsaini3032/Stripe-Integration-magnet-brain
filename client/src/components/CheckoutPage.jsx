



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
}

export default function CheckoutPage() {
  const cart = loadCart();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  async function handleCheckout(e) {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Email is required');
      return;
    }
    if (cart.length === 0) {
      setError('Cart is empty');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_API_URL || 'http://localhost:5000'
        }/api/checkout/create-session`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, items: cart }),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create session');
      window.location.href = data.url;
    } catch (err) {
      setError(err.message || 'Checkout failed');
      setLoading(false);
    }
  }

  return (
    <div className="checkout-page-container">
      <h2>Checkout</h2>
      <div className="checkout-grid">
        <div>
          <h3>Items</h3>
          {cart.length === 0 && <p>Cart is empty</p>}
          {cart.map(i => (
            <div
              key={i.productId}
              className="checkout-item">
              <div>
                {i.title} x {i.quantity}
              </div>
              <div>${((i.price * i.quantity) / 100).toFixed(2)}</div>
            </div>
          ))}
          <div className="total">
            Total: <strong>${(total / 100).toFixed(2)}</strong>
          </div>
        </div>

        <form
          onSubmit={handleCheckout}
          className="checkout-form">
          <h3>Payment</h3>
          <label>Email</label>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            type="email"
            required
          />
          <p>You will be redirected to Stripe to complete payment.</p>
          {error && <div className="error">{error}</div>}
          <button
            type="submit"
            disabled={loading}>
            {loading ? 'Redirecting...' : 'Proceed to Checkout'}
          </button>
        </form>
      </div>
    </div>
  );
}

