"use client";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input, Label } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import { TGetQuoteSchema, getQuoteSchema } from "@/lib/zod-schema";
import { TQuotation } from "@/types";
import { CartItem, clearCart } from "@/redux-store/slice/quotation-cart-slice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit-hook";
import { toast } from "react-toastify";
import { sendQuotationAction } from "@/actions/quotation.action";

const QuotationCartForm = () => {
  const cartItems: CartItem[] = useAppSelector((state) => state.cart.cartItem);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TGetQuoteSchema>({
    resolver: zodResolver(getQuoteSchema),
  });

  const processForm: SubmitHandler<TGetQuoteSchema> = async (data) => {
    const newQuote: TQuotation = {
      fullName: data.fullName,
      mobileNumber: parseInt(data.mobileNumber),
      message: data.message,
      quotedProducts: cartItems.map((item) => ({
        imageUrl: item.imageUrl,
        prodName: item.title,
        price: item.price,
        qty: item.qty,
      })),
    };
    
    const res = await sendQuotationAction(newQuote);
    if (!res?.success)
      return toast.error("Please try again!!", { theme: "colored" });
    toast.success(res.message, { theme: "colored" });
    dispatch(clearCart());
    localStorage.setItem("cartList", "[]");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(processForm)}
      className="flex flex-col py-3 px-2"
    >
      {/* full-name input */}
      <div className="flex flex-col">
        <Label labelText="Full Name" forText="fullName" />
        <Input {...register("fullName")} type="text" placeholder="Full Name" />
        {errors.fullName?.message && (
          <span className="text-xs text-destructive p-1">
            {errors.fullName?.message}
          </span>
        )}
      </div>
      {/* mobile-number input */}
      <div className="flex flex-col">
        <Label forText="mobileNumber" labelText="Mobile Number" />
        <Input
          {...register("mobileNumber")}
          type="tel"
          placeholder="Mobile Number"
        />
        {errors.mobileNumber?.message && (
          <span className="text-xs text-destructive p-1">
            {errors.mobileNumber?.message}
          </span>
        )}
      </div>
      {/* textarea for message input */}
      <div className="flex flex-col">
        <Label forText="message" labelText="Message" />
        <textarea
          {...register("message")}
          placeholder="Type Your Message..."
          className="flex w-full rounded-md border border-input bg-muted/50 py-2 px-3 mb-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          rows={4}
        />
        {errors.message?.message && (
          <span className="text-xs text-destructive p-1">
            {errors.message?.message}
          </span>
        )}
      </div>
      {/* submit button */}
      <div className="flex flex-col justify-center items-center pt-4">
        <Button
          type="submit"
          className={cn(
            "capitalize tracking-wider font-medium",
            cartItems.length < 1 && "pointer-events-none opacity-50"
          )}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Quote"}
        </Button>
      </div>
    </form>
  );
};

export default QuotationCartForm;
