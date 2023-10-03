import React from "react";
import { prisma } from "@/lib/prismadb";
import { redirect } from "next/navigation";
import FormSubmitButton from "@/components/FormSubmitButton";

export const metadata = {
  title: "Add Prodcut - Flowmazon",
};

async function addProduct(formData: FormData) {
  "use server";
  const name = formData.get("name")?.toString() as string;
  const description = formData.get("description")?.toString() as string;
  const imageUrl = formData.get("imageUrl")?.toString() as string;
  const price = Number(formData.get("price") || 0);

  if (!name && !description && !imageUrl && !price) {
    throw new Error("Invalid required field");
  }
  await prisma.product.create({
    data: {
      name: name,
      description: description,
      imageUrl: imageUrl,
      price: price,
    },
  });
  redirect("/");
}

const AddProductPage = () => {
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold text-black">Add Product</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          type="text"
          className="mb-3 w-full input input-bordered"
        />
        <textarea
          className="textarea textarea-bordered mb-3 w-full"
          required
          name="description"
          placeholder="Description"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="mb-3 w-full input input-bordered"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="mb-3 w-full input input-bordered"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
};

export default AddProductPage;
