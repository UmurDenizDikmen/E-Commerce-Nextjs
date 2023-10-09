import ProductCart from "@/components/ProductCart";
import { prisma } from "@/lib/prismadb";
import { Metadata } from "next";

type SearchPageParams = {
  searchParams: {
    query: string;
  };
};

export function generateMetadata({
  searchParams: { query },
}: SearchPageParams): Metadata {
  return {
    title: `Search : ${query}`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageParams) {
  const product = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (product.length === 0) {
    return <div className="text-center">No products found</div>;
  }

  return (
    <div className="grid grid-col-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {product.map((product) => {
        return <ProductCart product={product} key={product.id} />;
      })}
    </div>
  );
}
