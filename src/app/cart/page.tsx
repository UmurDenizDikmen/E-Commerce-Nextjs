import CartEntry from "./CartEntry";
import { getCart } from "@/lib/cart";
import React from "react";
import setProducutQuantity from "./action";
import formatPrice from "@/lib/format";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Your Cart",
};

export default async function Cart() {
  const cart = await getCart();
  revalidatePath("/cart", "page");

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => {
        return (
          <CartEntry
            cartItem={cartItem}
            key={cartItem.id}
            setProducutQuantity={setProducutQuantity}
          />
        );
      })}
      {!cart?.items.length && <p>You are cart is empty</p>}
      <div className="flex flex-col items-end gap-2 sm:items-center ">
        <p className="mb-3 font-bold ">
          Total : {formatPrice(cart?.subtotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px] border-zinc-950 border-solid">
          Checkout
        </button>
      </div>
    </div>
  );
}
