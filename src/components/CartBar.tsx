import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';

export const CartBar: React.FC = () => {
  const { totalItems, subtotal } = useCartContext();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/summary')}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-2xl py-4 px-6 shadow-xl flex items-center justify-between text-xl font-bold transition-colors duration-200 hover:shadow-2xl transform hover:scale-105"
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart size={28} />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-800 rounded-full min-w-6 h-6 flex items-center justify-center text-sm font-bold">
                {totalItems}
              </span>
            </div>
            <span>Lihat Pesanan</span>
          </div>
          <span>{formatPrice(subtotal)}</span>
        </button>
      </div>
    </div>
  );
};