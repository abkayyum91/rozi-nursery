import { TProductCategory } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// calculating discount percentage
export const getDiscount  = (mrp: number, price: number)=>{
  const discount = mrp - price;
  const discountPercent = (discount / mrp) * 100;
  return discountPercent.toFixed(0);
}


// generating slug
export const generateSlug = (title: string) => {
  // Triming, to lowercase, replaces more than on space with -, remove non alpha numeric characters
  return title.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
};
// generating title from slug
export const generateTitleFromSlug = (slug: string) => {
  return slug.trim().toLowerCase().replace(/-/g, " ");
};


// generating category option from categoris data
export const getCatgoryOptions = (categories: TProductCategory[])=>{
  const categoryOptions = categories.map((item)=>{
    return { value: item.name, label: item.name };
  })
  return categoryOptions;
}

