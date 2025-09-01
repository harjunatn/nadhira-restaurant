import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative mb-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-6 w-6 text-slate-400" />
      </div>
      <input
        type="text"
        placeholder="Cari makanan favorit..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-4 text-xl bg-white border-2 border-pink-200 rounded-2xl focus:outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-200 transition-all duration-200 placeholder-slate-400"
      />
    </div>
  );
};