import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

type ProdcutCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProdcutCardProps) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <Link
      className="card w-full bg-base-100 hover:shadow-xl transition-shadow"
      href={"/products/" + product.id}
    >
      <figure>
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={300}
          height={400}
          className="h-48 object-cover mt-2"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        {isNew ? <div className="badge badge-secondary">NEW</div> : ""}
        <p>{product.description}</p>
        <PriceTag price={product.price} />
      </div>
    </Link>
  );
};

export default ProductCard;
