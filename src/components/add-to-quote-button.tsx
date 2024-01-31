"use client";

import { CartItem, addItem } from "@/redux-store/slice/quotation-cart-slice";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit-hook";
import { useRouter } from "next/navigation";
import { TProduct } from "@/types";

interface AddToQuoteButtonProps {
  product: TProduct;
  prodId?: string;
}

const AddToQuoteButton = ({ product, prodId }: AddToQuoteButtonProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems: CartItem[] = useAppSelector((state) => state.cart.cartItem);
  const isAdded = cartItems.find((prod) => prod._id === prodId);

  const handelAddToQuote = () => {
    const item = cartItems.find((item) => item._id === prodId);
    if (item) {
      router.push("/quotation-cart");
    } else {
      const newCartItem: CartItem = {
        _id: product._id!,
        title: product.title,
        category: product.category,
        imageUrl: product.imageUrl,
        mrp: product.mrp,
        price: product.price,
        qty: 1,
        subTotal: product.price,
      };
      dispatch(addItem(newCartItem));
      localStorage.setItem(
        "cartList",
        JSON.stringify([...cartItems, newCartItem])
      );
    }
  };

  return (
    <Button
      className={`flex justify-center items-center gap-2 w-full ${
        isAdded && "bg-background text-primary border border-primary"
      }`}
      onClick={handelAddToQuote}
    >
      {isAdded ? (
        <>
          <Icons.check size={16} />
          Added
        </>
      ) : (
        <>
          <Icons.quotationCart size={16} />
          Add to quote
        </>
      )}
    </Button>
  );
};

export default AddToQuoteButton;
