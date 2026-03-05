"use client"
import { useRouter, useSearchParams } from "next/navigation"

type Props = {
  brands: { id: number; name: string }[]
}

export default function BrandFilter({ brands }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selected = searchParams.get("brand")?.split(",") ?? []

  function toggleBrand(name: string) {
    const params = new URLSearchParams(searchParams.toString())
    const current = params.get("brand")?.split(",") ?? []

    const next = current.includes(name)
      ? current.filter((b) => b !== name)
      : [...current, name]

    if (next.length === 0) {
      params.delete("brand")
    } else {
      params.set("brand", next.join(","))
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Marke</h3>

      <ul className="space-y-2">
        {brands.map((brand) => (
          <li key={brand.id}>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(brand.name)}
                onChange={() => toggleBrand(brand.name)}
              />
              <span>{brand.name}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
