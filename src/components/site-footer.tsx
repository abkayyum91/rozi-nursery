import Link from "next/link";
import { TLink } from "@/types";
import {
  plantCategoryConfig,
  planterConfing,
  getHelpConfig,
} from "@/config/footer";

const SiteFooter = () => {
  return (
    <footer className="bg-muted border-t border-border py-10">
      <div className="container">
        <div className="grid grid-flow-row md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Plants category */}
          <FooterLink
            headTitle={plantCategoryConfig.head}
            links={plantCategoryConfig.links}
          />

          {/* Planters */}
          <FooterLink
            headTitle={planterConfing.head}
            links={planterConfing.links}
          />

          {/* help center */}
          <FooterLink
            headTitle={getHelpConfig.head}
            links={getHelpConfig.links}
          />

          {/* Shop Address */}
          <div className="text-center md:text-start">
            <p className="text-lg font-semibold capitalize pb-2">
              Shop Address
            </p>
            <p className="text-base my-2 text-foreground/90">
              Old Alka Cinema, Sector 15 <br />
              Noida - 201 301 <br /> Mob.: 98******76 / 80******54
            </p>
          </div>
        </div>

        {/* copyright and developer details */}
        <div className="flex flex-col gap-y-3 md:flex-row md:gap-y-0 justify-between mt-6">
          <div className="text-xs lg:text-sm cursor-pointer flex justify-center">
            <span>
              &copy; Copyright 2023. All Right Reserved by Rozi Nursery
            </span>
          </div>
          <div className="text-xs lg:text-sm text-primary capitalize cursor-pointer flex justify-center">
            <Link href={"#"}>Developer : @Abdul91</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;



function FooterLink({
  headTitle,
  links,
}: {
  headTitle: string;
  links: TLink[];
}) {
  return (
    <div className="text-center md:text-start">
      <p className="text-lg font-semibold capitalize pb-2">{headTitle}</p>
      <ul className="text-base text-foreground/80">
        {links.map((link, index) => (
          <li key={index} className="pb-2">
            <Link
              href={link.disabled ? "#" : link.slug}
              className="capitalize hover:text-foreground/100 duration-200"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
