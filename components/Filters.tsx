"use client"
import { useRouter, useSearchParams } from "next/navigation"

type Color = {
  id: number
  name: string
  hex: string | null
}

type FiltersProps = {
  colors: Color[]
}

export default function Filters({ colors }: FiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function toggleColor(colorName: string) {
    const params = new URLSearchParams(searchParams.toString())
    const current = params.get("color")?.split(",") ?? []

    const next = current.includes(colorName)
      ? current.filter((c) => c !== colorName)
      : [...current, colorName]

    if (next.length === 0) {
      params.delete("color")
    } else {
      params.set("color", next.join(","))
    }

    router.push(`?${params.toString()}`)
  }

  const selected = searchParams.get("color")?.split(",") ?? []

  return (
    <aside className="w-60">
      <h3 className="font-semibold mb-3">Farbe</h3>

      <ul className="space-y-2">
        {colors.map((color) => (
          <li key={color.id}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(color.name)}
                onChange={() => toggleColor(color.name)}
              />
              <span
                className="w-4 h-4 rounded-full border"
                style={{ backgroundColor: color.hex ?? "#ccc" }}
              />
              <span>{color.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </aside>
  )
}
