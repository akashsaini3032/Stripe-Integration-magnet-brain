


import React, { useState, useEffect } from 'react';
import productsData from '../data/products';

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('cart')) || [];
  } catch {
    return [];
  }
}

export default function ProductList() {
  const [products] = useState(productsData);
  const [cart, setCart] = useState(loadCart());

  useEffect(() => {
    saveCart(cart);
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cart]);

  function addToCart(product) {
    const idx = cart.findIndex(c => c.productId === product.id);
    let newCart;
    if (idx === -1) {
      newCart = [
        ...cart,
        {
          productId: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
        },
      ];
    } else {
      newCart = cart.map(c =>
        c.productId === product.id ? { ...c, quantity: c.quantity + 1 } : c
      );
    }
    setCart(newCart);
  }

  return (
    <div className="product-list-container">
      <h1>Products</h1>
      <div className="product-list-grid">
        {products.map(p => (
          <div
            key={p.id}
            className="product-card">
            <img
              src={p.image}
              alt={p.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '12px',
              }}
            />
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <p>
              <strong>${(p.price / 100).toFixed(2)}</strong>
            </p>
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
