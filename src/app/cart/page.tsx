import CartEntry from "@/components/CartEntry";
import { getCart } from "@/lib/cart";
import React from "react";
import setProducutQuantity from "./action";

export const metadata = {
  title: "Your Cart",
};

export default async function Cart() {
  const cart = await getCart();

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItems) => {
        return (
          <CartEntry
            cartItems={cartItems}
            key={cartItems.id}
            setProducutQuantity={setProducutQuantity}
          />
        );
      })}
    </div>
  );
}
