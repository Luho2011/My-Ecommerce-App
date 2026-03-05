"use client"
import { useRouter, useSearchParams } from "next/navigation"

type Size = {
  id: number
  label: string
}

type SizeFilterProps = {
  sizes: Size[]
}

export default function SizeFilter({ sizes }: SizeFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selected = searchParams.get("size")?.split(",") ?? []

  function toggleSize(label: string) {
    const params = new URLSearchParams(searchParams.toString())
    const current = params.get("size")?.split(",") ?? []

    const next = current.includes(label)
      ? current.filter((s) => s !== label)
      : [...current, label]

    if (next.length === 0) {
      params.delete("size")
    } else {
      params.set("size", next.join(","))
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div>
      <h3 className="font-semibold mb-3">Größe</h3>

      <ul className="space-y-2">
        {sizes.map((size) => (
          <li key={size.id}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(size.label)}
                onChange={() => toggleSize(size.label)}
              />
              <span>{size.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
