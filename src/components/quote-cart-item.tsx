"use client";
import Image from "next/image";
import { CartItem, addQty, removeItem, removeQty } from "@/redux-store/slice/quotation-cart-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit-hook";
import { Icons } from "./icons";

const QuoteCartItem = ({ data }: { data: CartItem }) => {
  const dispatch = useAppDispatch();
  const cartItems: CartItem[] = useAppSelector((state) => state.cart.cartItem);
  const handleRemove = () => {
    dispatch(removeItem(data._id));
    localStorage.setItem(
      "cartList",
      JSON.stringify(cartItems.filter((item) => item._id !== data._id))
    );
  };

  return (
    <div className="flex divide-x-2 divide-border bg-muted rounded">
      <div className="basis-[30%] pr-2 lg:px-4">
        <Image
          className="w-full rounded-md"
          src={data.imageUrl}
          width={200}
          height={200}
          alt="product image"
        />
      </div>
      <div className="basis-[70%] px-2 lg:px-4 grid">
        <div className="flex justify-between items-start gap-4">
          <h2 className="capitalize pt-1 text-base font-semibold leading-tight line-clamp-1">
            {data.title}
          </h2>
          <span
            className="text-xl text-destructive cursor-pointer"
            onClick={handleRemove}
          >
            &times;
          </span>
        </div>
        <div>
          <span className="text-lg font-semibold mr-3">
            &#8377; {data.price}
          </span>
          <span className="text-sm line-through">&#8377; {data.mrp}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Icons.minus
              className={`cursor-pointer bg-primary text-primary-foreground ${
                data.qty! <= 1 && "bg-primary/60 pointer-events-none"
              }`}
              onClick={()=> dispatch(removeQty(data._id))}
              size={20}
            />
            <span className="text-base font-semibold px-2">{data.qty}</span>
            <Icons.plus
              className="cursor-pointer bg-primary text-primary-foreground"
              onClick={()=> dispatch(addQty(data._id))}
              size={20}
            />
          </div>
          <div className="text-base font-semibold flex justify-center items-center gap-1">
            <Icons.sigma size={20} />
            {data.subTotal}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCartItem;
