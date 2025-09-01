import React from 'react';
import { MenuCard } from './MenuCard';
import { MenuItem } from '../types';

interface CategorySectionProps {
  category: string;
  items: MenuItem[];
  onItemAdded?: () => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ category, items, onItemAdded }) => {
  if (items.length === 0) return null;

  const getCategoryEmoji = (category: string) => {
    switch (category.toLowerCase()) {
      case 'makanan':
        return '🍽️';
      case 'minuman':
        return '🥤';
      case 'dessert':
        return '🍰';
      default:
        return '🍴';
    }
  };

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{getCategoryEmoji(category)}</span>
        <h2 className="text-3xl font-bold text-slate-800">{category}</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <MenuCard key={item.id} item={item} onItemAdded={onItemAdded} />
        ))}
      </div>
    </div>
  );
};