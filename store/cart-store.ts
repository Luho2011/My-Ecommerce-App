import { create } from "zustand"
import { persist } from "zustand/middleware"

type CartItem = {
  id: number
  title: string
  price: number
  quantity: number
  imageUrl?: string;
}

type CartStore = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: number) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  clear: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(i => i.id === item.id)

          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            }
          }

          return {
            items: [...state.items, { ...item, quantity: 1 }],
          }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter(i => i.id !== id),
        })),

        //  Menge erhöhen
      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      // Menge verringern (wenn 1 → entfernen)
      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clear: () => set({ items: [] }),
    }),
    {
      name: "cart-storage", // 🔥 key in localStorage
    }
  )
)
