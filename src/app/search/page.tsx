import ProductCart from "@/components/ProductCart";
import { prisma } from "@/lib/prismadb";
import { Metadata } from "next";

type SearchPageProps = {
  searchParams: { query: string };
};

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: ${query} - GlowMazon`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
  });

  if (products.length === 0) {
    return <div className="text-center">No products found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((products) => (
        <ProductCart product={products} key={products.id} />
      ))}
    </div>
  );
}
