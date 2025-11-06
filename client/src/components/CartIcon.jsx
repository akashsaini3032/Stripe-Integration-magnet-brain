


import React, { useEffect, useState } from 'react';
import CartModal from './CartModal';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch {
    return [];
  }
}

export default function CartIcon() {
  const [count, setCount] = useState(
    loadCart().reduce((s, i) => s + i.quantity, 0)
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onUpdate() {
      const cart = loadCart();
      setCount(cart.reduce((s, i) => s + i.quantity, 0));
    }
    window.addEventListener('cartUpdated', onUpdate);
    return () => window.removeEventListener('cartUpdated', onUpdate);
  }, []);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          top: '20px',
          right: '25px',
          background: '#ffffff',
          padding: '10px 16px',
          borderRadius: '50px',
          boxShadow: '0 3px 12px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '20px',
          zIndex: 2000,
          transition: '0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
        🛒
        <span
          style={{
            background: '#ff4d4d',
            color: '#fff',
            padding: '2px 9px',
            borderRadius: '50%',
            fontSize: '14px',
            fontWeight: '700',
            minWidth: '22px',
            textAlign: 'center',
          }}>
          {count}
        </span>
      </div>

      {open && <CartModal onClose={() => setOpen(false)} />}
    </>
  );
}

