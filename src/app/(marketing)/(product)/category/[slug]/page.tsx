import { getProductByCategorySlug } from "@/actions/product.action";
import { ProductCard } from "@/components";
import { generateTitleFromSlug } from "@/lib/utils";
import { TProduct } from "@/types";

const ProductByCategory = async ({params}: {params: {slug: string}}) => {
  const products:TProduct[] = await getProductByCategorySlug(params.slug);
  return (
    <div className="container pt-3 lg:pt-5 pb-10">
      <div className="flex justify-center items-center pb-10 lg:pt-2">
        <h1 className="text-xl lg:text-2xl font-semibold uppercase tracking-wider">
          {generateTitleFromSlug(params.slug)}
        </h1>
      </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5 lg:grid-cols-5 lg:gap-6 jusitem">
            {products.map((item, index)=>(
              <ProductCard key={index} data={item}/>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center text-2xl font-semibold">
            Sorry!!! there is no product to show you!
          </div>
        )}
      
    </div>
  );
};

export default ProductByCategory;
