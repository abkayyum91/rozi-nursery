"use client";
import { ChangeEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input, Label, Modal, QuotationModalForm } from ".";
import { Icons } from "./icons";
import { cn, getDiscount } from "@/lib/utils";
import Image from "next/image";
import { TProduct } from "@/types";
import { ToastContainer } from "react-toastify";

interface GetQuoteButtonProps {
  data?: TProduct;
}

const GetQuoteButton = ({ data }: GetQuoteButtonProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [qty, setQty] = useState("1");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQty(value);
  };

  return (
    <>
      <Button
        onClick={() => setOpenModal(!openModal)}
        className={cn("flex justify-center items-center gap-1")}
      >
        <Icons.fileText size={16} />
        Get Quote
      </Button>

      {openModal && (
        <Modal
          title="Product Quotation"
          onClose={() => setOpenModal(!openModal)}
          closeOuter={true}
        >
          {/* toast message */}
          <ToastContainer position="top-center" />

          <div className="grid w-full gap-4">
            {/* product detail for quatation */}
            {data && (
              <div className="flex justify-center items-center divide-x-2 divide-border bg-muted rounded">
                {/* product-image */}
                <div className="basis-[30%] pr-2">
                  <Image
                    className="w-full rounded-md"
                    src={data.imageUrl}
                    width={200}
                    height={200}
                    alt="product image"
                  />
                </div>
                {/* product-desc */}
                <div className="grid px-2 basis-[70%]">
                  <p className="text-base lg:text-lg font-semibold capitalize line-clamp-1">
                    {data.title}
                  </p>
                  <p className="text-xs uppercase text-muted-foreground">
                    {data.category}
                  </p>
                  <div className="pt-1">
                    <span className="text-base font-semibold">
                      &#8377; {data.price}
                    </span>
                    <span className="text-sm text-muted-foreground line-through pl-3">
                      &#8377; {data.mrp}
                    </span>
                    <span className="text-primary text-base font-medium md:font-semibold pl-3">
                      {getDiscount(data.mrp, data.price)}% off
                    </span>
                  </div>
                  {/* quantity */}
                  <div className="flex items-center gap-4">
                    <div className="grid">
                      <Label
                        forText="qty"
                        labelText="Quantity: "
                        className="text-base font-medium p-0"
                      />
                      {!qty && (
                        <span className="text-xs text-destructive">
                          Required!
                        </span>
                      )}
                    </div>
                    <Input
                      type="number"
                      min={1}
                      value={qty}
                      onChange={handleChange}
                      className="bg-background w-16 text-base p-1 text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* basic user form */}
            <QuotationModalForm qty={qty} product={data} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default GetQuoteButton;
