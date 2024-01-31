import { Icons } from "@/components/icons";

export type TLink = {
  title: string;
  slug: string;
  disabled?: boolean;
};

export type TSideNav = TLink & {
  icon?: keyof typeof Icons;
}

export type TMarketingNav = TLink & {
  subLink?: boolean;
  category?: boolean;
  categories?: {
    head: string;
    headSlug: string;
    subLinks?: TLink[]
  }[]
}

export type TMarketingConfig = {
  mainNav: TMarketingNav[];
}

export type TDashboardConfig={
  mainNav: TLink[];
  sideNav: TSideNav[];
}


export type TSiteConfig = {
    name: string;
    description: string;
    url:string;
    developer: string;
    developer_link: string;
    ogImage?: string;
    links: {
        instagram?: string;
        twitter?: string;
    }
}


// category & tag selection options
interface selectionOptions{
  value: string;
  label: string;
}

// product-form-value
export interface productFormValue{
  title: string;
  bestSeller?: boolean;
  mrp: number;
  price: number;
  desc: string;
  prodType: selectionOptions;
  category: selectionOptions;
  tags: selectionOptions[];
}
// product 
export type TProduct = {
  _id?: string;
  productType: string;
  title: string;
  titleSlug: string;
  category: string;
  categorySlug: string;
  desc?: string;
  mrp: number;
  price: number;
  imageUrl: string;
  imagePublicId: string;
  tags: string[];
  bestSeller?: boolean;
}

// product-category
export interface TProductCategory {
  _id?: string;
  name: string;
  slug?: string;
  imageUrl: string;
  imagePublicId: string;
  trending: boolean;
}

// quotation
export interface TQuotation{
  _id?: string;
  fullName:string;
  mobileNumber: number;
  message?: string;
  quotedProducts:{
    imageUrl?: string;
    prodName?: string;
    qty?: number;
    price?: number;
  }[]
}


// Garden care banner
export type TBannerConfig = {
  title: string;
  desc: string;
  image: string;
  url: string;
}

// why choose us 
// (*** In TypeScript, the keyof operator is used to extract the keys of a type as a union type ***)
export type TWhyChooseUsConfig = {
  title: string;
  icon: keyof typeof Icons;
}
export type TWhyChooseDescConfig = {
  desc: string;
}

// Footer types
export type TPlantCategoryConfig = {
  head: string;
  links: TLink[];
}
export type TPlanterConfig = {
  head: string;
  links: TLink[];
}
export type TGetHelpConfig = {
  head: string;
  links: TLink[];
}