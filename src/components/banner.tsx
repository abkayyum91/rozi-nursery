import Image from "next/image";
import Link from "next/link";
import { TBannerConfig } from "@/types";
import { buttonVariants } from "./ui/button";

type TBannerProps = {
  data: TBannerConfig;
};

const Banner = ({ data }: TBannerProps) => {
  const { title, desc, image, url } = data;
  return (
    <div className="relative">
      <Image
        src={image}
        className="w-full"
        width={900}
        height={600}
        alt="Banner Image"
      />
      <div className="absolute inset-0 bg-black/[0.5] hover:bg-transparent duration-300">
        <div className="absolute top-3 left-3 md:top-6 md:left-6 xl:top-14 xl:left-14 right-1/4 text-white">
          <h1
            className={`text-base lg:text-lg font-semibold uppercase md:pb-2`}
          >
            {title}
          </h1>
          <p className="capitalize text-sm lg:text-base line-clamp-2">{desc}</p>
          <div className="flex justify-start py-2">
            <Link
              href={url}
              className={buttonVariants({
                variant: "linkPrimary",
                size: "default",
                className: "text-base font-medium",
              })}
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
