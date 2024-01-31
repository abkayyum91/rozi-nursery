import {
  GetQuoteButton,
  MainNav,
  QuotationCartButton,
  SiteFooter,
} from "@/components";
import { marketingConfig } from "@/config/marketing";
import Link from "next/link";
import React from "react";

type MarketingLayoutProps = {
  children: React.ReactNode;
};

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container z-40 bg-background sticky top-0">
        <div className="flex justify-between items-center py-2">
          {/* site-logo */}
          <div className="flex justify-center">
            <Link href={"/"} className="text-2xl font-semibold">
              Rozi Nursery
            </Link>
          </div>
          <MainNav items={marketingConfig.mainNav}>
            <div className="flex items-center py-2">
              <GetQuoteButton />
            </div>
          </MainNav>
          <div className="flex justify-end items-center gap-6">
            <QuotationCartButton />
            <div className="hidden md:flex items-center">
              <GetQuoteButton />
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
