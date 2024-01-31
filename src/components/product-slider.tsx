"use client";
import { TProduct } from "@/types";
import { ProductCard } from ".";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

type TProductProps = {
    products: TProduct[];
}

const ProductSlider = ({products}: TProductProps) => {
  return (
    <Carousel>
      <CarouselContent>
        {products?.map((prod, index)=>(
          <CarouselItem key={index} className="basis-[70%] md:basis-[40%] lg:basis-[22%]">
            <ProductCard data={prod} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0 hidden md:flex"/>
      <CarouselNext className="right-0 hidden md:flex"/>
    </Carousel>
  );
};

export default ProductSlider;
