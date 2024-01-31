import { TDashboardConfig } from "@/types";


export const dashboardConfig:TDashboardConfig = {
    mainNav: [
        {title: "Home", slug:"/"},
        {title: "Shop", slug:"/dashboard"},
        {title: "Feedback", slug:"/dashboard/feedback", disabled:true},
    ],
    sideNav: [
        {title: "Products", slug:"/dashboard", icon: "leaf"},
        {title: "Categories", slug:"/dashboard/categories", icon: "layer"},
        {title: "Quotations", slug:"/dashboard/quotations", icon: "quotationCart"},
    ]
}