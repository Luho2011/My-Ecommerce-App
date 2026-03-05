import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import ProductCard from "@/components/ProductCard";

type SearchParams = {
  q?: string;
};

export default async function HerrenPage( {
   searchParams, 
  }: {
    searchParams: Promise<SearchParams>;
  }) { 

  const params = await searchParams; // Promise auflösen
  const query = params.q || "";

  const where: Prisma.ProductWhereInput = {
    AND: [
      { gender: "HERREN" },
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
        <h1 className="text-2xl font-bold">Herren</h1>
      </div>

      <div className="px-25 flex flex-wrap gap-7 justify-center">
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
    </main>
  );
}

