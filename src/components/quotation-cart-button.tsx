"use client";
import Link from "next/link";
import { Icons } from "./icons";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit-hook";
import {
  CartItem,
  addItemFromLocalStorage,
} from "@/redux-store/slice/quotation-cart-slice";

const QuotationCartButton = () => {
  const dispatch = useAppDispatch();
  const cartData: CartItem[] = useAppSelector((state) => state.cart.cartItem);
  useEffect(() => {
    const items = localStorage.getItem("cartList");
    if (items) {
      const cartItems: CartItem[] = JSON.parse(items);
      dispatch(addItemFromLocalStorage(cartItems));
    }
  }, []);

  return (
    <div className="bg-muted flex justify-center items-center h-9 w-9 rounded-full relative">
      <Link
        href="/quotation-cart"
        className="cursor-pointer hover:scale-110 duration-100"
      >
        <Icons.quotationCart className="text-primary h-[18px] w-[18px]" />
      </Link>
      {cartData.length > 0 && (
        <div className="bg-primary text-primary-foreground absolute top-0.5 left-6 flex justify-center items-center h-3 min-w-3 p-0.5 text-[10px] rounded-full">
          {cartData.length}
        </div>
      )}
    </div>
  );
};

export default QuotationCartButton;
