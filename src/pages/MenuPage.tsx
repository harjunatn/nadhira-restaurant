import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { SearchBar } from '../components/SearchBar';
import { CategorySection } from '../components/CategorySection';
import { CartBar } from '../components/CartBar';
import { Toast } from '../components/Toast';
import { menuItems } from '../data/menuItems';

export const MenuPage: React.FC = () => {
  const [toast, setToast] = useState({ show: false, message: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const showToast = (message: string) => {
    setToast({ show: true, message });
  };

  const hideToast = () => {
    setToast({ show: false, message: '' });
  };

  const handleItemAdded = () => {
    showToast('Ditambahkan! 🎉');
  };

  // Filter items based on search term
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group filtered items by category
  const groupedItems = filteredItems.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as Record<string, typeof menuItems>);

  // Get categories in a specific order
  const categoryOrder = ['Makanan', 'Minuman', 'Dessert'];
  const orderedCategories = categoryOrder.filter(category => 
    groupedItems[category] && groupedItems[category].length > 0
  );
  return (
    <>
      <Layout title="Pilih Menu 🍰">
        <SearchBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <div className="pb-32">
          {orderedCategories.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-2xl text-slate-600">Tidak ada makanan yang ditemukan</p>
              <p className="text-lg text-slate-500 mt-2">Coba kata kunci lain</p>
            </div>
          ) : (
            orderedCategories.map(category => (
              <CategorySection
                key={category}
                category={category}
                items={groupedItems[category]}
                onItemAdded={handleItemAdded}
              />
            ))
          )}
        </div>
        
        <CartBar />
      </Layout>
      
      <Toast
        message={toast.message}
        isVisible={toast.show}
        onHide={hideToast}
      />
    </>
  );
};