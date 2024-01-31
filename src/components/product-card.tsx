import Image from "next/image";
import Link from "next/link";
import { getDiscount } from "@/lib/utils";
import { TProduct } from "@/types";
import { AddToQuoteButton } from ".";

interface ProductCardProps{
  data: TProduct;
}

const ProductCard = ({ data }: ProductCardProps) => {

  return (
    <div className="rounded bg-card text-card-foreground shadow-md">
      {/* Product Image */}
      <Link href={`/product/${data.titleSlug}`}>
        <Image
          src={data.imageUrl}
          className="w-full max-w-[300px] max-h-[200px] transform overflow-hidden hover:scale-105 duration-300"
          width={300}
          height={200}
          alt="Product Image"
        />
      </Link>

      {/* Product Detail */}
      <div className="p-2">
        <div className="w-full">
          <Link
            href={`/category/${data.categorySlug}`}
            className="text-xs lg:text-sm font-semibold uppercase pb-1 text-muted-foreground/60 hover:text-muted-foreground duration-100 cursor-pointer line-clamp-1"
          >
            {data.category}
          </Link>
          <Link href={`/product/${data.titleSlug}`} className="cursor-pointer">
            <h2 className="capitalize text-base md:text-xl font-medium hover:text-card-foreground/80 duration-100 pb-1 line-clamp-1">
              {data.title}
            </h2>
          </Link>
        </div>

        {/* pricing & discount */}
        <div className="flex justify-between py-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg font-semibold">&#8377;{data.price}</span>
            <span className="text-base line-through text-muted-foreground/80">
              &#8377;{data.mrp}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-primary text-sm md:text-base font-medium md:font-semibold">
              {getDiscount(data.mrp, data.price)}% off
            </span>
          </div>
        </div>

        {/* add to bag button */}
        <div className="py-2">
          <AddToQuoteButton prodId={data._id} product={data}/>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
