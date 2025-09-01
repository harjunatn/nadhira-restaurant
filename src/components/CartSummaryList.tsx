import React from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useCartContext } from "../context/CartContext";

export const CartSummaryList: React.FC = () => {
  const { items, updateQuantity, removeItem } = useCartContext();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🛒</div>
        <p className="text-2xl text-slate-600">Keranjang masih kosong</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 justify-items-center md:justify-items-stretch"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="text-4xl">{item.emoji}</div>

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-800">{item.name}</h3>
              <p className="text-lg text-pink-600 font-semibold">
                {formatPrice(item.price)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.qty - 1)}
                className="bg-red-500 hover:bg-red-600 text-white rounded-xl min-h-12 min-w-12 flex items-center justify-center transition-colors duration-200 shadow-md"
              >
                <Minus size={20} />
              </button>

              <span className="text-2xl font-bold text-slate-800 min-w-12 text-center">
                {item.qty}
              </span>

              <button
                onClick={() => updateQuantity(item.id, item.qty + 1)}
                className="bg-green-500 hover:bg-green-600 text-white rounded-xl min-h-12 min-w-12 flex items-center justify-center transition-colors duration-200 shadow-md"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold text-slate-800">
                {formatPrice(item.price * item.qty)}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-600 mt-2 p-1"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
