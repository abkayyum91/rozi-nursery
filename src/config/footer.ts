import { TPlantCategoryConfig, TPlanterConfig, TGetHelpConfig } from "@/types";

export const plantCategoryConfig: TPlantCategoryConfig = {
  head: "Plant Category",
  links: [
    { title: "crotans", slug: "/crotans", disabled: false },
    { title: "aglonima", slug: "/aglonima", disabled: false },
    { title: "berkin", slug: "/berkin", disabled: false },
    { title: "cactus", slug: "/cactus", disabled: false },
    { title: "bonsai", slug: "/bonsai", disabled: false },
    { title: "china dol", slug: "/china dol", disabled: false },
  ],
};

export const planterConfing: TPlanterConfig = {
  head: "Planters",
  links: [
    { title: "ceremic planter", slug: "/ceremic-planters", disabled: false },
    { title: "plastic planter", slug: "/plastic-planters", disabled: false },
    { title: "cement articles", slug: "/cement-articles", disabled: false },
  ],
};

export const getHelpConfig: TGetHelpConfig = {
  head: "Get Help",
  links: [
    { title: "Delivery", slug: "/delivery", disabled: false },
    { title: "Returns Policy", slug: "/returns-policy", disabled: false },
    { title: "Get Quotation", slug: "/ask-quotation", disabled: false },
    { title: "Admin", slug: "/admin-login", disabled: false },
  ],
};
