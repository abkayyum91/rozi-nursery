"use client";
import { useState } from "react";
import { Icons } from "./icons";
import Link from "next/link";
import { TMarketingNav } from "@/types";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MobileNav } from ".";

type TMainNavProps = {
  items: TMarketingNav[];
  children?: React.ReactNode;
};

const MainNav = ({ items, children }: TMainNavProps) => {
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false);
  const pathname = usePathname();
  return (
    <div className={cn("flex gap-10 items-center order-first md:order-none")}>
      {/* mobile-menu icon */}
      <div className="md:hidden cursor-pointer">
        <Icons.menu
          size={28}
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        />
      </div>

      {/* nav-links */}
      <nav className="hidden md:flex items-center gap-4">
        {items?.map((link, index) =>
          link.category ? (
            <div
              key={index}
              className={cn(
                "relative group flex justify-center items-center gap-2 p-2 text-base text-foreground/60 hover:text-foreground duration-200 cursor-pointer"
              )}
            >
              {link.title}
              <Icons.chevronDown />

              {link.subLink ? (
                // mega dropdown menu for sub-menu links
                <div className="hidden group-hover:block hover:block duration-200 fixed left-0 right-0 top-8 pt-6 z-50">
                  <div className="bg-background text-foreground/60 shadow-md rounded">
                    <div className="py-4 px-10 grid grid-flow-col auto-cols-fr gap-10">
                      {link.categories?.map((cat, index) => (
                        <div key={index} className="col-span-1">
                          <Link
                            href="#"
                            className="py-2 uppercase text-base font-medium text-primary cursor-pointer duration-200"
                          >
                            {cat.head}
                          </Link>
                          <div className="flex flex-col mt-3">
                            {cat.subLinks?.map((slink, index) => (
                              <Link
                                key={index}
                                href={slink.disabled ? "#" : slink.slug}
                                className={cn(
                                  "py-1 capitalize text-base hover:text-foreground duration-200",
                                  slink.disabled &&
                                    "cursor-not-allowed opacity-50"
                                )}
                              >
                                {slink.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // dropdown menu for sub-menu
                <div className="hidden group-hover:block hover:block duration-200 absolute left-0 top-6 pt-5 z-50">
                  <div className="bg-background text-foreground/60 shadow-md rounded w-max">
                    <div className="w-full flex flex-col">
                      {link.categories?.map((cat, index) => (
                        <Link
                          href={cat.headSlug}
                          key={index}
                          className="px-4 py-3 hover:bg-muted/90 hover:text-foreground duration-200 rounded"
                        >
                          {cat.head}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={link.disabled ? "#" : link.slug}
              key={index}
              className={cn(
                "p-2 text-base hover:text-foreground duration-200 cursor-pointer",
                pathname === link.slug
                  ? "text-foreground"
                  : "text-foreground/60",
                link.disabled && "cursor-not-allowed opacity-50"
              )}
            >
              {link.title}
            </Link>
          )
        )}
      </nav>

      {/* mobile-nav */}
      {showMobileMenu && items && (
        <MobileNav
          items={items}
          closeMenu={() => setShowMobileMenu(!showMobileMenu)}
        >
          {children}
        </MobileNav>
      )}
    </div>
  );
};

export default MainNav;
