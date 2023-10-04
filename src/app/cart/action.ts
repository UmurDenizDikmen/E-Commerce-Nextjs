"use server";
import { revalidatePath } from "next/cache";
import { createCart, getCart } from "@/lib/cart";
import { prisma } from "@/lib/prismadb";

export default async function setProducutQuantity(
  productId: string,
  quantity: number
) {
  const cart = (await getCart()) ?? (await createCart());
  const articleCart = cart.items.find((items) => items.productId);

  if (quantity === 0) {
    if (articleCart) {
      await prisma.cartItem.delete({
        where: { id: articleCart.id },
      });
    }
  } else {
    if (articleCart) {
      await prisma.cartItem.update({
        where: { id: articleCart.id },
        data: { quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity: 1,
        },
      });
    }
  }

  revalidatePath("/cart");
}
