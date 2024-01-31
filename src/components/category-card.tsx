import { TProductCategory } from "@/types";
import Image from "next/image";
import Link from "next/link";

const CategoryCard = ({ data }: { data: TProductCategory }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Image */}
      <Link href={`category/${data.slug}`} className="cursor-pointer">
        <Image
          src={data.imageUrl}
          className="w-[150px] h-[150px] rounded-full shadow transition hover:scale-90 overflow-hidden duration-200"
          width={150}
          height={150}
          alt="Plants Category Image"
        />
      </Link>
      {/* Category Name */}
      <div className="py-4">
        <Link href={`category/${data.slug}`} className="cursor-pointer">
          <h2 className="capitalize text-sm md:text-base font-semibold text-center text-wrap hover:text-foreground/80 duration-200">
            {data.name}
          </h2>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
