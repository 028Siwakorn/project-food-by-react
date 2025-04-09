import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

interface StoreState {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (itemId: number, size?: string) => void;
  increaseQuantity: (itemId: number, size?: string) => void;
  decreaseQuantity: (itemId: number, size?: string) => void;
}

const useStore = create<StoreState>((set) => ({
  cartItems: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cartItems.find(
        (i) => i.id === item.id && i.size === item.size
      );
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((i) =>
            i.id === item.id && i.size === item.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      } else {
        return {
          cartItems: [...state.cartItems, { ...item, quantity: 1 }],
        };
      }
    }),
  removeFromCart: (itemId, size) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === itemId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),
  increaseQuantity: (itemId, size) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === itemId && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),
  decreaseQuantity: (itemId, size) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === itemId && item.size === size
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),
}));

export default useStore;