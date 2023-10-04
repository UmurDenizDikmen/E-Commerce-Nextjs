import Link from "next/link";
import Image from "next/image";
import logo from "public/images/logo.png";
import { redirect } from "next/navigation";
import ShoppingCardButton from "./ShoppingCartButton";
import { getCart } from "@/lib/cart";

async function searchProducts(formData: FormData) {
  "use server";
  const searchQuery = formData.get("searchQuery")?.toString() as string;
  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const cart = await getCart();
  return (
    <div className="bg-base-100">
      <div className="navbar max-w-7xl m-auto flex-col sm:flex-row gap-2">
        <div className="flex-1">
          <Link href={"/"}>
            <Image
              src={logo}
              className="btn btn-ghost text-xl normal-case"
              height={90}
              width={90}
              alt={""}
            />
            Flowmazon
          </Link>
        </div>
        <div className="flex-none gap-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[100%]"
              />
            </div>
          </form>
          <ShoppingCardButton cart={cart} />
        </div>
      </div>
    </div>
  );
}
