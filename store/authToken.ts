import { create } from "zustand";

interface State {
  authToken: string;
  setAuthToken: (token: string) => void;
}

interface Item {
  name: string;
  price: number;
  count: number;
  id: number;
}

interface CartState {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (item: Item) => void;
  updateItem: (oldItem: Item, newItem: Item) => void;
}

export const useStore = create<State>((set) => ({
  authToken: "",
  setAuthToken: (token: string) => set({ authToken: token }),
}));

export const useCart = create<CartState>((set) => ({
  items: [],
  addItem: (item: Item) =>
    set((state) => {
      const existingItemIndex = state.items.findIndex((i) => i.id === item.id);
      if (existingItemIndex >= 0) {
        // If item exists, increase the count
        const newItems = [...state.items];
        newItems[existingItemIndex].count += 1;
        return { items: newItems };
      } else {
        // If item does not exist, add it to the cart
        return { items: [...state.items, { ...item, count: 1 }] };
      }
    }),
  removeItem: (item: Item) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== item.id) })),
  updateItem: (oldItem: Item, newItem: Item) =>
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (i) => i.id === oldItem.id
      );
      if (existingItemIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingItemIndex] = newItem;
        if (newItems[existingItemIndex].count <= 0) {
          // If count is zero or less, remove the item from the list
          return { items: newItems.filter((i) => i.id !== newItem.id) };
        } else {
          // Otherwise, update the count
          return { items: newItems };
        }
      } else {
        // If item does not exist, do nothing
        return state;
      }
    }),
}));
