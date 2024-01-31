import {
  getProductByCategorySlug,
  getProductBySlug,
} from "@/actions/product.action";
import { GetQuoteButton, ProductSlider } from "@/components";
import { generateTitleFromSlug, getDiscount } from "@/lib/utils";
import { TProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductDetails = async ({ params }: { params: { slug: string } }) => {
  const productOne = await getProductBySlug(params.slug);
  const product: TProduct = productOne?.[0];
  const relatedProd: TProduct[] = await getProductByCategorySlug(
    product?.categorySlug
  );

  return (
    <div className="container py-5">
      {/* product details */}
      <div className="flex flex-col lg:flex-row justify-between bg-card text-card-foreground gap-6 py-5">
        {/* product image */}
        <div className="basis-1/2">
          <Image
            src={product.imageUrl}
            className="w-full"
            width={800}
            height={800}
            alt="product image"
          />
        </div>

        {/*  description */}
        <div className="basis-1/2 px-3">
          {/* product name & category */}
          <div className="flex flex-col gap-1">
            <h1 className="capitalize text-lg lg:text-xl font-semibold leading-tight tracking-wider">
              {product.title}
            </h1>
            <Link
              href={`/category/${product.categorySlug}`}
              className="text-sm font-semibold uppercase text-muted-foreground/80 hover:text-muted-foreground duration-100 cursor-pointer"
            >
              {product.category}
            </Link>
          </div>
          {/* mrp, price & discount */}
          <div className="py-4">
            <span className="text-2xl lg:text-3xl font-semibold">
              &#8377; {product.price}
            </span>
            <span className="text-base text-muted-foreground line-through pl-3">
              &#8377; {product.mrp}
            </span>
            <span className="text-primary text-base font-medium md:font-semibold pl-6">
              {getDiscount(product.mrp, product.price)}% off
            </span>
          </div>
          {/* categories tags */}
          <div className="py-4">
            <p className="text-base capitalize font-medium">Related tags</p>
            <div className="py-2 flex flex-wrap gap-3">
              {product.tags?.map((item, index) => (
                <Link
                  key={index}
                  href={`/category/${item}`}
                  className="capitalize text-sm bg-muted text-muted-foreground px-3 py-1.5 rounded-full hover:opacity-90"
                >
                  {generateTitleFromSlug(item)}
                </Link>
              ))}
            </div>
          </div>

          {/* get quote button */}
          <div className="pt-5 pb-10">
            <GetQuoteButton data={product} />
          </div>
          {/* product description */}
          {product.desc && (
            <div className="py-4 border-t">
              <p className="text-justify text-base text-foreground">
                {product.desc}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* similar product */}
      <div className="pt-10">
        <h1 className="text-lg lg:text-2xl capitalize font-semibold tracking-wider">
          Similar Products
        </h1>
        {/* product carousel */}
        <div className="py-5">
          <ProductSlider products={relatedProd} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
