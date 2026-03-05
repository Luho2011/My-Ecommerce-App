"use client"
import { useCartStore } from "@/store/cart-store"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, increaseQuantity, decreaseQuantity } = useCartStore()

  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0)

  return (
    <main className="p-6">
      <div className="flex justify-between mb-10 mt-10">
        <h1 className="text-2xl font-bold">Warenkorb</h1>
        <Link href="/" className="text-xl font-bold underline hover:text-blue-700">Home</Link>
      </div>

      {items.length === 0 && <p>Cart is empty</p>}

      {items.map(item => (
        <div key={item.id} className="flex w-2/3 border-2 mb-3 bg-gray-200 h-50 items-center [@media(max-width:949px)]:w-full">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="h-full w-30 object-contain"
          />
          <div className="bg-gray-300 flex flex-col gap-2 justify-center items-center px-5 w-75 h-full">
            <h1 className="text-[16px]">{item.title}</h1>
            <h1 className="font-bold">{item.price} €</h1>
                <div className="flex flex-col items-center gap-3">
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 border-2 rounded cursor-pointer"
                  >
                    –
                  </button>
                  <span className="font-bold">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 border-2 rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 cursor-pointer"
                >
                  Entfernen
                </button>
              </div>
          </div>
        </div>
      ))}

      {items.length > 0 && (
        <p className="mt-4 font-bold">Total: {total.toFixed(2)} €</p>
      )}
    </main>
  )
}

