import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types/product.types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

interface CartStore extends CartState {
  addItem: (product: Product, quantity: number, customizations?: Record<string, string>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity, customizations) => {
        const { items } = get();
        const itemExists = items.find(
          (item) => 
            item.productId === product.id && 
            JSON.stringify(item.customizations) === JSON.stringify(customizations)
        );

        if (itemExists) {
          const updatedItems = items.map((item) => {
            if (
              item.productId === product.id && 
              JSON.stringify(item.customizations) === JSON.stringify(customizations)
            ) {
              const newQuantity = item.quantity + quantity;
              return {
                ...item,
                quantity: newQuantity,
                totalPrice: (product.discountPrice || product.price) * newQuantity,
              };
            }
            return item;
          });
          set({ items: updatedItems });
        } else {
          const totalPrice = (product.discountPrice || product.price) * quantity;
          const newItem: CartItem = {
            productId: product.id,
            product,
            quantity,
            customizations,
            totalPrice,
          };
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (productId) => {
        const { items } = get();
        const updatedItems = items.filter((item) => item.productId !== productId);
        set({ items: updatedItems });
      },

      updateQuantity: (productId, quantity) => {
        const { items } = get();
        const updatedItems = items.map((item) => {
          if (item.productId === productId) {
            return {
              ...item,
              quantity,
              totalPrice: (item.product.discountPrice || item.product.price) * quantity,
            };
          }
          return item;
        });
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
      },

      openCart: () => {
        set({ isOpen: true });
      },

      closeCart: () => {
        set({ isOpen: false });
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.totalPrice, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

export default useCartStore;