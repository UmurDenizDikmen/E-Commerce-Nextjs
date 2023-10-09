import { prisma } from "@/lib/prismadb";
import ProductCard from "@/components/ProductCart";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const product = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });
  return (
    <div>
      <div className="hero rounded-xl bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src={product[0].imageUrl}
            alt={product[0].name}
            width={400}
            height={800}
            className="w-full max-w-sm rounded-lg shadow-2xl"
            priority
          />
          <div>
            <h2 className="text-2xl font-bold ">{product[0].name}</h2>
            <p className="py-6">{product[0].description}</p>
            <Link
              className="btn btn-primary border-stone-600"
              href={"/products/" + product[0].id}
            >
              Check it out
            </Link>
          </div>
        </div>
      </div>
      <div className="my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {product.slice(1).map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
}
