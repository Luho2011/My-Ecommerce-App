"use client"
import { useRouter, useSearchParams } from "next/navigation"

type Props = {
  brands: { id: number; name: string }[]
}

export default function BrandFilter({ brands }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const selected = searchParams.get("brand")?.split(",") ?? [] // aktuell ausgewählte marke

  function toggleBrand(name: string) {
    const params = new URLSearchParams(searchParams.toString())
    const current = params.get("brand")?.split(",") ?? [] // split hier für marken in array umwandeln, current hier array von marken

    const next = current.includes(name) // next aktuelles array mit den marken als filter
      ? current.filter((b) => b !== name) // wenn name in current schon drin ist, filter es raus -> behalte alles, was nicht name ist
      : [...current, name]

    if (next.length === 0) {
      params.delete("brand")
    } else {
      params.set("brand", next.join(",")) // join macht hier das Gegenteil von split, bringt marken quasi wieder zusammen
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
