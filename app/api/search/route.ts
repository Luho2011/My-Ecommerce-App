import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type ProductResult = {
  id: number;
  title: string;
};

export async function GET(req: Request) {
  //erhält url mit queryanfrage aus searchbar ("") und wird in q gespeichert. unten genutzt title. containts
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";


  let results: ProductResult[] = [];

    results = await prisma.product.findMany({
      where: {
        title: { contains: q, mode: "insensitive" },
      },
      select: { id: true, title: true},
      take: 5,
    });

  return NextResponse.json(results);
}