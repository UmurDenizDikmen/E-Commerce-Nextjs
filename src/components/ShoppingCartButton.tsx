"use client";
import { ShoppingCart } from "@/lib/cart";
import formatPrice from "@/lib/format";
import Link from "next/link";
import { useEffect } from "react";

type ShoppingCartButtonProps = {
  cart: ShoppingCart | null;
};

const ShoppingCartButton = ({ cart }: ShoppingCartButtonProps) => {
  const cartSize = cart?.size || 0;
  const cartTotal = cart?.subtotal || 0;
  function closeDropdown() {
    const elem = document.activeElement as HTMLElement;
    if (elem) {
      elem.blur();
    }
  }

  useEffect(() => {}, [cart]);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn-ghost btn-circle btn">
        <div className="indicator">
          <svg
            xmlns="https://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 25 25"
            stroke="red"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="badge badge-sm indicator-item">{cartSize}</span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="card dropdown-content card-compact mt-3 w-52 bg-base-100 shadow z-30"
      >
        <div className="card-body">
          <span className="text-lg font-bold ">{cartSize}</span>
          <span className="text-info">Subtotal:{formatPrice(cartTotal)}</span>
          <div className="card-actions">
            <Link
              className="btn btn-primary btn-block"
              href={"/cart"}
              onClick={closeDropdown}
            >
              View cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartButton;
