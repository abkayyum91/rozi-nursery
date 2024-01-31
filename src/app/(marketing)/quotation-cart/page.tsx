"use client";
import { QuotationCartForm, QuoteCartItem } from "@/components";
import { useAppSelector } from "@/hooks/redux-toolkit-hook";
import { CartItem } from "@/redux-store/slice/quotation-cart-slice";
import { ToastContainer } from "react-toastify";

const QuotationCartPage = () => {
  const cartItems: CartItem[] = useAppSelector((state) => state.cart.cartItem);
  let total = 0;
  if (cartItems){
    cartItems.map((item)=> total += item.subTotal);
  }

  return (
    <div className="container py-10 flex flex-col lg:flex-row gap-10 lg:gap-16">
      {/* product details itself */}
      {cartItems.length > 0 ? (
        <div className="basis-1/2">
          <h1 className="text-lg px-2 lg:text-xl font-semibold tracking-wider capitalize">
            Added Products ({cartItems.length})
          </h1>
          {/* product list */}
          <div className="py-4 flex flex-col gap-4">
            {cartItems.map((item) => (
              <QuoteCartItem key={item._id} data={item} />
            ))}
          </div>
          {/* Grand total */}
          <div className="py-2 flex justify-end items-center">
            <p className="text-lg tracking-wider font-semibold capitalize">
              Grand Total:{" "}
              <span className="bg-muted px-6 py-2 text-xl font-semibold rounded">
                &#8377; {total}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="basis-1/2 my-20 flex flex-col justify-center items-center">
          <h1 className="text-lg font-mono font-semibold text-muted-foreground">Oops! Your cart is empty.</h1>
          <p className="text-sm text-muted-foreground">Please add some product!</p>
        </div>
      )}

      {/* basic user form */}
      <div className="basis-1/2">
        <h1 className="text-lg px-2 lg:text-xl font-semibold tracking-wider capitalize">
          Send Quatation
        </h1>
        <QuotationCartForm />
      </div>
      <ToastContainer/>
    </div>
  );
};

export default QuotationCartPage;
