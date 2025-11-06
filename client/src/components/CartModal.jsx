



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

export default function CartModal({ onClose }) {
  const [cart, setCart] = useState(loadCart());
  const navigate = useNavigate();

  function changeQty(productId, delta) {
    const newCart = cart.map(i =>
      i.productId === productId
        ? { ...i, quantity: Math.max(1, i.quantity + delta) }
        : i
    );
    setCart(newCart);
    saveCart(newCart);
  }

  function removeItem(productId) {
    const newCart = cart.filter(i => i.productId !== productId);
    setCart(newCart);
    saveCart(newCart);
  }

  function goToCheckout() {
    onClose();
    navigate('/checkout');
  }

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        background: 'rgba(0,0,0,0.55)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
      }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '420px',
          background: '#ffffff',
          padding: '25px',
          borderRadius: '18px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
          animation: 'fadeIn .25s ease',
        }}>
        <h3
          style={{
            margin: '0 0 15px',
            fontSize: '22px',
            fontWeight: '600',
            color: '#333',
          }}>
          Your Cart
        </h3>

        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {cart.length === 0 && (
            <p style={{ textAlign: 'center', opacity: 0.6 }}>Cart is empty</p>
          )}

          {cart.map(i => (
            <div
              key={i.productId}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '12px',
                borderRadius: '10px',
                background: '#f6f6f6',
                marginBottom: '10px',
                alignItems: 'center',
              }}>
              <div>
                <strong style={{ fontSize: '15px' }}>{i.title}</strong>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  ${(i.price / 100).toFixed(2)}
                </div>
              </div>

              <div
                style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={() => changeQty(i.productId, -1)}
                  style={qtyBtn}>
                  -
                </button>

                <span style={{ fontSize: '15px', fontWeight: '600' }}>
                  {i.quantity}
                </span>

                <button
                  onClick={() => changeQty(i.productId, +1)}
                  style={qtyBtn}>
                  +
                </button>

                <button
                  onClick={() => removeItem(i.productId)}
                  style={{
                    padding: '6px 10px',
                    fontSize: '12px',
                    background: '#ff4d4d',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: '20px',
            paddingTop: '15px',
            borderTop: '1px solid #ddd',
          }}>
          <div style={{ fontSize: '17px', marginBottom: '15px' }}>
            Total:{' '}
            <strong style={{ fontSize: '18px', color: '#111' }}>
              ${(total / 100).toFixed(2)}
            </strong>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '15px',
                borderRadius: '10px',
                border: '1px solid #ccc',
                background: '#fff',
                cursor: 'pointer',
                fontWeight: '500',
              }}>
              Continue Shopping
            </button>

            <button
              onClick={goToCheckout}
              disabled={cart.length === 0}
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '15px',
                borderRadius: '10px',
                background: cart.length === 0 ? '#ccc' : '#4CAF50',
                color: '#fff',
                border: 'none',
                cursor: cart.length === 0 ? 'not-allowed' : 'pointer',
                fontWeight: '600',
              }}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Quantity Button Style */
const qtyBtn = {
  padding: '4px 10px',
  fontSize: '15px',
  fontWeight: '600',
  background: '#e0e0e0',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
};

