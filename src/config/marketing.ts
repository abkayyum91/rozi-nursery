import { TMarketingConfig } from "@/types";

export const marketingConfig: TMarketingConfig = {
  mainNav: [
    { title: "Home", slug: "/", disabled: false },
    {
      title: "Plants",
      slug: "/plants",
      subLink: true,
      category: true,
      categories: [
        {
          head: "TRENDING PLANTS",
          headSlug: "trending-plants",
          disabled: true,
          subLinks: [
            { title: "Gift Plants", slug: "/category/gift-plants" },
            { title: "Oxygen Plants", slug: "/category/oxygen-plants" },
            { title: "Flower Plants", slug: "/category/flower-plants" },
            { title: "Winter Plants", slug: "/category/winter-plants" },
            { title: "Aquatic Plants", slug: "/category/aquatic-plants", disabled:true },
            { title: "Aromatic Plants", slug: "/category/aromatic-plants" },
            { title: "Bonsai Plants", slug: "/category/bonsai-plants" },
            { title: "Cactus and Succulents", slug: "/category/cactus-and-succulents" },
            { title: "Bamboo Plants", slug: "/category/bamboo-plants" },
          ],
        },
        {
          head: "PLANTS BY TYPE",
          headSlug: "plants-by-type",
          disabled: true,
          subLinks: [
            { title: "Climbers adn Creepers", slug: "/category/climbers-and-creepers"},
            { title: "Herbs Plants", slug: "/category/herbs-plants" },
            { title: "Air Purifier Plants", slug: "/category/air-purifier-plants"},
            { title: "Cactus and Succulents", slug: "/category/cactus-and-succulents"},
            { title: "Bamboo Plants", slug: "/category/bamboo-plants"},
            { title: "Bonsai Plants", slug: "/category/bonsai-plants"},
            { title: "Aglaonema Plants", slug: "/category/aglaonema-plants"},
          ],
        },
        {
          head: "PLANTS BY LOCATION",
          headSlug: "plants-by-location",
          disabled: true,
          subLinks: [
            { title: "Indoor Plants", slug: "/category/indoor-plants" },
            { title: "Outdoor Plants", slug: "/category/outdoor-plants" },
            { title: "Office Plants", slug: "/category/office-plants" },
            { title: "Home Plants", slug: "/category/home-plants" },
          ],
        },
        {
          head: "PLANTS BY SEASON",
          headSlug: "plants-by-season",
          disabled: true,
          subLinks: [
            { title: "Winter Plants", slug: "/category/winter-plants" },
            { title: "Summer Plants", slug: "/category/summer-plants" },
            { title: "All Seasons Plants", slug: "/category/all-seasons-plants" },
            { title: "Monsoon Plants", slug: "/category/monsoon-plants" },
          ],
        },
        {
          head: "FOLIAGE PLANTS",
          headSlug: "foliage-plants",
          disabled: true,
          subLinks: [
            { title: "Money Plants", slug: "/category/money-plants" },
            { title: "Snake Plants", slug: "/category/snake-plants" },
            { title: "Spider Plants", slug: "/category/spider-plants" },
            { title: "Jade Plants", slug: "/category/jade-plants" },
          ],
        },
      ],
    },
    {
      title: "Planters",
      slug: "/planters",
      subLink: false,
      category: true,
      categories: [
        { head: "Ceremic Planters", headSlug: "/category/ceremic-planters" },
        { head: "Plastic Planters", headSlug: "/category/plastic-planters" },
        { head: "Cement Planters", headSlug: "/category/cement-planters" },
      ],
    },
    { title: "About Us", slug: "/about", disabled: false },
  ],
};


































