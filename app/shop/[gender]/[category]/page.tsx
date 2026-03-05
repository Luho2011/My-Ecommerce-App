import { prisma } from "@/lib/prisma"
import ProductCard from "@/components/ProductCard"
import Filters from "@/components/Filters"
import SizeFilter from "@/components/SizeFilter"
import PriceFilter from "@/components/PriceFilter"
import BrandFilter from "@/components/BrandFilter"
import FilterMenu from "@/components/FilterMenu"
import NavBar from "@/components/NavBar"


type CategoryPageProps = {
  params: {
    gender: string
    category: string
  }
  searchParams: Promise<{ color?: string; size?: string; priceMin?: string; priceMax?: string;  brand?: string }>;
}

export default async function CategoryPage({
    params,
    searchParams,
}: CategoryPageProps) {

  const { gender, category } = await params
  const genderEnum = gender.toUpperCase() as "HERREN" | "DAMEN"
  const resolvedSearchParams = await searchParams; // Promise
  const selectedColors = resolvedSearchParams.color?.split(",") ?? [];
  const selectedSizes = resolvedSearchParams.size?.split(",") ?? [];
  const selectedBrands = resolvedSearchParams.brand?.split(",") ?? []
  const min = resolvedSearchParams.priceMin ? Number(resolvedSearchParams.priceMin) : undefined
  const max = resolvedSearchParams.priceMax ? Number(resolvedSearchParams.priceMax) : undefined

    // Color Filter
    const colors = await prisma.color.findMany({
    where: {
      variants: {
        some: {
          product: {
            gender: genderEnum,
            category: { slug: category },
          },
        },
      },
    },
    orderBy: { name: "asc" },
  })

  // Size Filter
  const sizes = await prisma.size.findMany({
  where: {
    variants: {
      some: {
        product: {
          gender: genderEnum,
          category: { slug: category },
        },
      },
    },
  },
  orderBy: { label: "asc" },
})

// Brand Filter
const brands = await prisma.brand.findMany({
  where: {
    products: {
      some: {
        gender: genderEnum,
        category: { slug: category },
      },
    },
  },
  orderBy: { name: "asc" },
})

  const priceRange = await prisma.product.aggregate({
    _min: { price: true },
    _max: { price: true },
    where: {
      gender: genderEnum,
      category: { slug: category },
    },
  })

  const products = await prisma.product.findMany({
    where: {
      gender: genderEnum,
      category: {
        slug: category,
      },

    ...(selectedBrands.length > 0 && {
      brand: {
        slug: {
          in: selectedBrands,
          mode: "insensitive",
        },
      },
    }),

    ...(min !== undefined || max !== undefined
      ? {
          price: {
            ...(min !== undefined && { gte: min }),
            ...(max !== undefined && { lte: max }),
          },
        }
      : {}),

    variants: {
      some: {
        stock: { gt: 0 },

          ...(selectedColors.length > 0 ? { color: { name: { in: selectedColors } } } : {}),
          ...(selectedSizes.length > 0 ? { size: { label: { in: selectedSizes } } } : {}),
      },
    },
    },
    include: { variants: { include: { color: true, size: true } } },
    orderBy: { createdAt: "desc" },
  })
console.log("Selected Brands:", selectedBrands)

  return (
    <main className="bg-gray-200 flex flex-col items-center">
       <NavBar/>
      <div className="flex justify-between mb-7 mt-15">
        <h1 className="text-2xl font-bold capitalize">
          {gender} – {category}
        </h1>
      </div>  

        {products.length === 0 && (
          <p className="text-gray-600">Keine Produkte gefunden.</p>
        )}

        <div className="w-full flex flex-col items-center">
         <div className="w-3/4">
            <FilterMenu>
              <Filters colors={colors} />
              <SizeFilter sizes={sizes} />
              <BrandFilter brands={brands} />
              <PriceFilter
                minPrice={priceRange._min.price ?? 0}
                maxPrice={priceRange._max.price ?? 500}
              />
            </FilterMenu>
         </div> 
            <div className="flex flex-wrap gap-7 w-3/4">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      imageUrl: product.imageUrl ?? undefined, 
                    }}
                  />
                ))}
            </div>
        </div>
    </main>
  )
}