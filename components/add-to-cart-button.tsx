"use client"

import { useCartStore } from "@/store/cart-store"

type Props = {
  product: {
    id: number
    title: string
    price: number
  }
}

export default function AddToCartButton({ product }: Props) {
  const addItem = useCartStore(state => state.addItem)

  return (
    <button
      onClick={() => addItem(product)}
      className="mt-2 bg-black text-white px-3 py-1 cursor-pointer"
    >
      Add to Cart
    </button>
  )
}

