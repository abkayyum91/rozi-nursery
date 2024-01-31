import { getCategories } from "@/actions/category.action";
import {
  CategoryOperation,
  DashboardHeader,
  DashboardShell,
} from "@/components";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { TProductCategory } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer } from "react-toastify";



const DashboardCategoriesPage = async () => {
  const categories:TProductCategory[] = await getCategories();
  return (
    <DashboardShell className="pb-10">
      <DashboardHeader
        heading="Categories"
        text="Create and manage your categories."
      >
        <div>
          <Link
            href="/dashboard/create/category-creation"
            className={buttonVariants({
              variant: "linkPrimary",
              className: "flex items-center gap-2",
            })}
          >
            <Icons.plus size={16} />
            Create
          </Link>
        </div>
      </DashboardHeader>

      {/* categories to show */}
      {categories.length > 0 ? (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-4">
        {categories.map((item)=> (
          <div key={item._id} className="border border-border shadow-md rounded-md">
            <Image
              src={item.imageUrl}
              className="w-full rounded-md"
              height={200}
              width={200}
              alt="product image"
            />
            <div className="p-2 grid gap-2">
              <h2 className="capitalize text-sm font-medium line-clamp-3">
                {item.name}
              </h2>
              <CategoryOperation data={item}/>
            </div>
          </div>
        ))}
      </div>
      ) : (
      <div className="pt-16 flex flex-col gap-4 justify-center items-center">
        <h2 className="text-3xl font-mono font-semibold">There is no categories to show you!</h2>
        <p className="text-muted-foreground text-sm">Please create new category by clicking on create button</p>
      </div>
      )}
      <ToastContainer/>
    </DashboardShell>
  );
};

export default DashboardCategoriesPage;
