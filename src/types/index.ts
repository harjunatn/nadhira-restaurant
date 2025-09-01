export interface MenuItem {
  id: string;
  name: string;
  price: number;
  emoji: string;
  category: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  emoji: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}