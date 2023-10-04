import { prisma } from "@/lib/prismadb";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/components/PriceTag";
import { cache } from "react";
import { Metadata } from "next";
import AddToCartButton from "@/components/AddToCartButton";
import { incerementProductQuantity } from "./action";

type ProductPageProps = {
  params: {
    id: string;
  };
};

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }
  return product;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);
  return {
    title: product?.name,
    description: product?.description,
    openGraph: {
      images: [
        {
          url: product.imageUrl,
        },
      ],
    },
  };
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  const { name, imageUrl, description, price } = product;

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image
        src={imageUrl}
        alt={name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold text-black">{name}</h1>
        <PriceTag price={price} className="mt-4" />
        <p className="py-6">{description}</p>
        <AddToCartButton
          productId={product.id}
          incerementProductQuantity={incerementProductQuantity}
        />
      </div>
    </div>
  );
}
