import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { CartSummaryList } from '../components/CartSummaryList';
import { QRModal } from '../components/QRModal';
import { useCartContext } from '../context/CartContext';

export const SummaryPage: React.FC = () => {
  const { subtotal, totalItems } = useCartContext();
  const [showQR, setShowQR] = useState(false);
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const tax = 0; // 0% tax as specified
  const grandTotal = subtotal + tax;

  return (
    <>
      <Layout title="Ringkasan Pesanan 📋">
        <div className="space-y-6 pb-32">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 text-slate-600 hover:text-slate-800 text-xl font-semibold transition-colors duration-200"
          >
            <ArrowLeft size={24} />
            Kembali ke Menu
          </button>

          <CartSummaryList />

          {totalItems > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 space-y-4">
              <div className="flex justify-between text-xl">
                <span className="text-slate-600">Subtotal:</span>
                <span className="font-bold text-slate-800">{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between text-xl">
                <span className="text-slate-600">Pajak (0%):</span>
                <span className="font-bold text-slate-800">{formatPrice(tax)}</span>
              </div>
              
              <hr className="border-pink-200" />
              
              <div className="flex justify-between text-2xl">
                <span className="font-bold text-slate-800">Total:</span>
                <span className="font-bold text-pink-600">{formatPrice(grandTotal)}</span>
              </div>

              <button
                onClick={() => setShowQR(true)}
                className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded-2xl min-h-16 text-2xl font-bold transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mt-6"
              >
                Bayar Sekarang 💳
              </button>
            </div>
          )}
        </div>
      </Layout>

      <QRModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        total={grandTotal}
      />
    </>
  );
};