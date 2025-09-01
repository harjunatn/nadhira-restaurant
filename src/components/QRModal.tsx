import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, total }) => {
  const { clearCart } = useCartContext();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleNewTransaction = () => {
    clearCart();
    onClose();
    navigate('/');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
        >
          <X size={24} />
        </button>

        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-slate-800">
            Scan untuk Bayar 📱
          </h2>
          
          <div className="text-2xl font-bold text-pink-600">
            {formatPrice(total)}
          </div>

          {/* Fake QR Code */}
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-2xl border-2 border-slate-200">
              <svg width="200" height="200" viewBox="0 0 200 200" className="border border-slate-300">
                {/* Simple fake QR pattern */}
                <rect width="200" height="200" fill="white"/>
                {Array.from({ length: 20 }, (_, i) => (
                  <g key={i}>
                    {Array.from({ length: 20 }, (_, j) => (
                      <rect
                        key={j}
                        x={i * 10}
                        y={j * 10}
                        width="10"
                        height="10"
                        fill={Math.random() > 0.5 ? '#000' : '#fff'}
                      />
                    ))}
                  </g>
                ))}
                {/* Corner squares */}
                <rect x="0" y="0" width="50" height="50" fill="black"/>
                <rect x="10" y="10" width="30" height="30" fill="white"/>
                <rect x="20" y="20" width="10" height="10" fill="black"/>
                
                <rect x="150" y="0" width="50" height="50" fill="black"/>
                <rect x="160" y="10" width="30" height="30" fill="white"/>
                <rect x="170" y="20" width="10" height="10" fill="black"/>
                
                <rect x="0" y="150" width="50" height="50" fill="black"/>
                <rect x="10" y="160" width="30" height="30" fill="white"/>
                <rect x="20" y="170" width="10" height="10" fill="black"/>
              </svg>
            </div>
          </div>

          <p className="text-lg text-slate-600">
            Arahkan kamera ke QR code ini
          </p>

          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full bg-slate-500 hover:bg-slate-600 text-white rounded-2xl min-h-14 text-xl font-bold transition-colors duration-200"
            >
              Tutup
            </button>
            
            <button
              onClick={handleNewTransaction}
              className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-2xl min-h-14 text-xl font-bold transition-colors duration-200"
            >
              Transaksi Baru 🎉
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};