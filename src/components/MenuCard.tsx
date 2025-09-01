import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { MenuItem } from '../types';
import { useCartContext } from '../context/CartContext';

interface MenuCardProps {
  item: MenuItem;
  onItemAdded?: () => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onItemAdded }) => {
  const { items, addItem, updateQuantity } = useCartContext();
  
  const cartItem = items.find(cartItem => cartItem.id === item.id);
  const quantity = cartItem?.qty || 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleAdd = () => {
    addItem(item);
    onItemAdded?.();
  };

  const handleIncrease = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(item.id, quantity - 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 flex flex-col items-center space-y-4 hover:shadow-md transition-shadow duration-200">
      <div className="text-6xl mb-2">{item.emoji}</div>
      
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-slate-800">{item.name}</h3>
        <p className="text-xl font-semibold text-pink-600">{formatPrice(item.price)}</p>
      </div>

      {quantity === 0 ? (
        <button
          onClick={handleAdd}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-2xl min-h-14 px-8 text-xl font-bold transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Plus size={24} />
          Tambah
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <button
            onClick={handleDecrease}
            className="bg-red-500 hover:bg-red-600 text-white rounded-xl min-h-12 min-w-12 flex items-center justify-center transition-colors duration-200 shadow-md"
          >
            <Minus size={20} />
          </button>
          
          <span className="text-2xl font-bold text-slate-800 min-w-8 text-center">
            {quantity}
          </span>
          
          <button
            onClick={handleIncrease}
            className="bg-green-500 hover:bg-green-600 text-white rounded-xl min-h-12 min-w-12 flex items-center justify-center transition-colors duration-200 shadow-md"
          >
            <Plus size={20} />
          </button>
        </div>
      )}
    </div>
  );
};