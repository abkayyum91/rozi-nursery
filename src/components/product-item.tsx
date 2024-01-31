import Image from "next/image";
import React from "react";
import { ProductOperation } from ".";
import { TProduct } from "@/types";

interface ProductItemProps {
  data: TProduct;
}

const ProductItem = ({ data }: ProductItemProps) => {
  return (
    <div className="grid gap-3 rounded-md shadow-md">
      {/* image */}
      <Image
        className="w-full rounded-md"
        src={data.imageUrl}
        width={500}
        height={500}
        alt="product image"
      />
      {/* details */}
      <div className="grid px-2 pb-3">
        <h2 className="text-lg capitalize font-semibold line-clamp-2">
          {data.title}
        </h2>
        <div className="flex justify-between items-center">
          <div className="grid">
            <p className="text-xs text-muted-foreground uppercase">
              {data.category}
            </p>
            <div className="pt-1">
              <span className="text-lg font-semibold mr-3">
                &#8377; {data.price}
              </span>
              <span className="text-xs text-muted-foreground">
                MRP. {data.mrp}
              </span>
            </div>
          </div>
          <ProductOperation data={data} />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
