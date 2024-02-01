"use client";
import { cn } from "@/lib/utils";
import { TMarketingNav } from "@/types";
import { Icons } from "./icons";
import Link from "next/link";
import { useState } from "react";
import { useLockBody } from "@/hooks/use-lock-body";

type TMobileNavProps = {
  items: TMarketingNav[];
  children?: React.ReactNode;
  closeMenu: () => void;
};

const MobileNav = ({ items, closeMenu, children }: TMobileNavProps) => {
  useLockBody();
  const [categoryText, setCategoryText] = useState<string>("");
  const [subLinkText, setSubLinkText] = useState<string>("");
  return (
    <div
      className={cn("fixed inset-0 bg-black/[0.5] z-10")}
      onClick={(e) => {
        if ((e.target as HTMLDivElement).id === "mebile-menu-overlay") {
          closeMenu();
        }
      }}
      id="mebile-menu-overlay"
    >
      <div
        className={cn(
          "md:hidden absolute top-0 bottom-0 left-0 right-[18%] overflow-auto",
          "bg-background text-foreground shadow-lg z-10",
          "animate-in slide-in-from-left-0 duration-300"
        )}
      >
        <div className="p-4 flex flex-col gap-6">
          {/* close-menu icon */}
          <div className="flex justify-end items-center">
            <Icons.close size={28} onClick={() => closeMenu()} />
          </div>

          {/* nav-link */}
          <nav className="flex flex-col gap-3">
            {items.map((link, index) =>
              link.category ? (
                <div key={index} className="flex flex-col gap-2">
                  <div
                    className="capitalize py-3 text-lg font-semibold flex justify-between items-center"
                    onClick={() => {
                      categoryText !== link.title
                        ? setCategoryText(link.title)
                        : setCategoryText("");
                      setSubLinkText("");
                    }}
                  >
                    {link.title}
                    <Icons.chevronDown />
                  </div>

                  {/* sub-menu start */}
                  <div
                    className={`${
                      categoryText !== link.title ? "hidden" : "flex"
                    } flex-col gap-3`}
                  >
                    {link.categories?.map((cat, index) => (
                      <div key={index} className="pl-4 flex flex-col gap-3">
                        <div
                          className="flex justify-between py-3"
                          onClick={() =>
                            subLinkText !== cat.head
                              ? setSubLinkText(cat.head)
                              : setSubLinkText("")
                          }
                        >
                          <Link
                            href={cat.disabled? "#" : cat.headSlug}
                            className="capitalize text-base font-medium"
                            onClick={() => closeMenu()}
                          >
                            {cat.head}
                          </Link>
                          {link.subLink && <Icons.chevronDown />}
                        </div>

                        {/* cheking subLinks */}
                        {link.subLink && (
                          <div
                            className={`${
                              subLinkText !== cat.head ? "hidden" : "flex"
                            } flex-col gap-3 pl-4`}
                          >
                            {cat.subLinks?.map((slink, index) => (
                              <Link
                                key={index}
                                href={slink.disabled ? "#" : slink.slug}
                                className={cn("capitalize text-base py-3 font-normal", 
                                slink.disabled && "cursor-not-allowed opacity-50")}
                                onClick={() => closeMenu()}
                              >
                                {slink.title}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={index}
                  href={link.disabled ? "#" : link.slug}
                  className={cn("capitalize py-3 text-lg font-semibold",
                   link.disabled && "cursor-not-allowed opacity-50")}
                  onClick={() => closeMenu()}
                >
                  {link.title}
                </Link>
              )
            )}
          </nav>

          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
