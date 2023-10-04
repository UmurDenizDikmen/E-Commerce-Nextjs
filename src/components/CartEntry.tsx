"use client";
import { CartItemWithProduct } from "@/lib/cart";
import formatPrice from "@/lib/format";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

type CartEntryProsp = {
  cartItems: CartItemWithProduct;
  setProducutQuantity: (productId: string, quantity: number) => Promise<void>;
};

export default function CartEntry({
  cartItems,
  setProducutQuantity,
}: CartEntryProsp) {
  const [isPending, startTransition] = useTransition();
  const quantityOptions: JSX.Element[] = [];
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>
    );
  }
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Image
          src={cartItems.product.imageUrl}
          alt={cartItems.product.name}
          width={200}
          height={200}
          className="rounded-lg"
        />{" "}
      </div>
      <div>
        <Link href={"/product/" + cartItems.product.id} className="font-bold">
          {" "}
          {cartItems.product.name}
        </Link>
        <div>Price : {formatPrice(cartItems.product.price)}</div>
        <div className="my-1 flex items-center gap-2">
          Quantity:
          <select
            className="select-bordered select w-full max-w-[%80]"
            defaultValue={cartItems.quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.currentTarget.value);
            }}
          >
            {quantityOptions}
          </select>
        </div>
        <div className="flex items-center gap-2">
          Total : {cartItems.product.price * cartItems.quantity}
        </div>
      </div>
      <div className="divider" />
    </div>
  );
}
