import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import CheckoutPage from './components/CheckoutPage';
import PaymentStatus from './components/PaymentStatus';
import CartIcon from './components/CartIcon';

export default function App() {
  return (
    <div>
      <nav className="topbar">
        <Link
          to="/"
          className="brand">
          My Shop
        </Link>
        <CartIcon />
      </nav>

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<ProductList />}
          />
          <Route
            path="/checkout"
            element={<CheckoutPage />}
          />
          <Route
            path="/payment-status"
            element={<PaymentStatus />}
          />
        </Routes>
      </main>
    </div>
  );
}
