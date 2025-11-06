


import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function getQuery(search) {
  return Object.fromEntries(new URLSearchParams(search));
}

export default function PaymentStatus() {
  const { search } = useLocation();
  const q = getQuery(search);
  const [status, setStatus] = useState(q.status || 'unknown');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'success') {
      setMessage('Payment completed. Thank you!');
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));
    } else if (status === 'canceled') {
      setMessage('Payment was canceled or failed.');
    } else {
      setMessage('Payment status unknown.');
    }
  }, [status]);

  return (
    <div className="payment-status-container">
      <h2>Payment Status</h2>
      <p>{message}</p>
      <div>
        <a href="/">Back to shop</a>
      </div>
    </div>
  );
}

