import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import AddToCartButton from "@/components/add-to-cart-button";
import NavBar from "@/components/NavBar";
import ProductCard from "@/components/ProductCard";

type SearchParams = {
  q?: string;
};

export default async function DamenPage( {
   searchParams, 
  }: {
    searchParams: Promise<SearchParams>;
  }) { 

  const params = await searchParams; // Promise auflösen
  const query = params.q || "";

  const where: Prisma.ProductWhereInput = {
    AND: [
      { gender: "DAMEN" }, 
      query ? { title: { contains: query, mode: "insensitive" } } : {},
    ],
  };

  const products = await prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });


  return (
    <main className="bg-gray-200 flex flex-col items-center">

      <div className="flex justify-between mb-7 mt-15">
        <h1 className="text-2xl font-bold">Damen</h1>
      </div>

      <div className="px-25 flex flex-wrap gap-7 justify-center">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}
