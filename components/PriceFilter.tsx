"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"

type Props = {
  minPrice: number
  maxPrice: number
}

export default function PriceFilter({ minPrice, maxPrice }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialMin = Number(searchParams.get("priceMin")) || minPrice
  const initialMax = Number(searchParams.get("priceMax")) || maxPrice

  const [minVal, setMinVal] = useState(initialMin)
  const [maxVal, setMaxVal] = useState(initialMax)

  // Verhindert Überschneiden
  useEffect(() => {
    if (minVal > maxVal) {
      setMinVal(maxVal)
    }
  }, [minVal, maxVal])

  function applyFilter() {
    const params = new URLSearchParams(searchParams.toString())

    params.set("priceMin", String(minVal))
    params.set("priceMax", String(maxVal))

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="w-80 space-y-4">
      <h3 className="font-semibold">Preis</h3>

      <div className="relative h-10 flex items-center">

        {/* Hintergrundlinie */}
        <div className="absolute w-full h-1 bg-gray-300 rounded" />

        {/* Aktiver Bereich */}
        <div
          className="absolute h-1 bg-black rounded"
          style={{
            left: `${((minVal - minPrice) / (maxPrice - minPrice)) * 100}%`,
            right: `${100 - ((maxVal - minPrice) / (maxPrice - minPrice)) * 100}%`,
          }}
        />

        {/* Min Slider */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={minVal}
          onChange={(e) => setMinVal(Number(e.target.value))}
          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
        />

        {/* Max Slider */}
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={maxVal}
          onChange={(e) => setMaxVal(Number(e.target.value))}
          className="absolute w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto"
        />
      </div>

      <div className="flex justify-between text-sm">
        <span>{minVal}€</span>
        <span>{maxVal}€</span>
      </div>

      <button
        onClick={applyFilter}
        className="bg-black text-white px-4 py-1 rounded"
      >
        Anwenden
      </button>
    </div>
  )
}
