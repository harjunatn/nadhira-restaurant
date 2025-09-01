import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { MenuPage } from './pages/MenuPage';
import { SummaryPage } from './pages/SummaryPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/summary" element={<SummaryPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;