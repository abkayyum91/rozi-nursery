import HeroSection from "@/components/landing_page/hero-section";
import { bannerConfig } from "@/config/banner";
import { WhyChooseUsConfig, WhyChooseDescConfig } from "@/config/why-choose";
import { Icons } from "@/components/icons";
import {
  CategoryCard,
  CommonSection,
  ProductSlider,
  Banner,
} from "@/components";
import { getCategories } from "@/actions/category.action";
import { TProduct, TProductCategory } from "@/types";
import { getProductsByType } from "@/actions/product.action";


export default async function IndexPage() {
  const categories:TProductCategory[] = await getCategories();
  const allPlants: TProduct[] = await getProductsByType("plant");
  const bestSellingPlant:TProduct[] = allPlants?.filter((item)=> item?.bestSeller);
  const giftPlants:TProduct[] = allPlants?.filter((item)=> item?.tags?.includes("gift-plants"));
  const allPlanters:TProduct[] = await getProductsByType("planter");
  const trendingPlanters:TProduct[] = allPlanters?.filter((item)=> item?.bestSeller);
  // console.log("gift prod: ", allPlants)

  return (
    <>
      <HeroSection />
      {/* best seller section */}
      <CommonSection title="Best Seller Plants">
        {bestSellingPlant.length > 0 &&
          <ProductSlider products={bestSellingPlant} />
        }
      </CommonSection>
      {/* trending category section */}
      <CommonSection title="Trending Category">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 px-3 lg:px-10 items-center">
          {categories?.map((item, index)=>(
            <CategoryCard key={index} data={item} />
          ))}
        </div>
      </CommonSection>

      {/* gifting plant section */}
      <CommonSection title="Gifting Plants">
      {giftPlants.length > 0 &&
          <ProductSlider products={giftPlants} />
      }
      </CommonSection>

      {/* garden decore & care section */}
      <CommonSection
        title="Garden Decore & Care"
        className="grid gap-5 grid-cols-1 md:grid-cols-2"
      >
        {bannerConfig.map((item, index) => (
          <Banner key={index} data={item} />
        ))}
      </CommonSection>

      {/* trending planter section */}
      <CommonSection title="Popular Planters">
      {trendingPlanters.length > 0 &&
          <ProductSlider products={trendingPlanters} />
      }
      </CommonSection>

      {/* Why choose us section */}
      <CommonSection title="Why Choose Us">
        <div className="flex flex-col gap-4">
          {/* descriptions */}
          <div className="flex justify-center items-center">
            <p className="text-base text-muted-foreground text-center">
              {WhyChooseDescConfig.desc}
            </p>
          </div>

          <div className="grid grid-flow-col auto-cols-fr gap-2 py-10">
            {WhyChooseUsConfig.map((item, index) => {
              const Icon = Icons[item.icon];
              return (
                <div
                  key={index}
                  className="flex flex-col gap-4 justify-start items-center"
                >
                  <Icon size={32} className="text-primary" />
                  <p className="capitalize text-xs md:text-base text-center text-wrap">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </CommonSection>
    </>
  );
}
