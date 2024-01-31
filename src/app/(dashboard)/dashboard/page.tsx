import { getAllProducts } from "@/actions/product.action";
import { DashboardHeader, DashboardShell, ProductItem } from "@/components";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { TProduct } from "@/types";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

const DashboardPage = async () => {
  const products: TProduct[] = await getAllProducts();

  return (
    <DashboardShell>
      <DashboardHeader heading="Products" text="Create and manage products.">
        <div>
          <Link
            href="/dashboard/create/product-creation"
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

      {/* product items */}
      {products.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products?.map((item) => (
            <ProductItem key={item._id} data={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center py-10">
          <h1 className="text-2xl font-mono font-semibold">
            Oops! there is no product.
          </h1>
          <p className="text-sm text-muted-foreground">
            Please, create new product by clicking on create button.
          </p>
        </div>
      )}

      {/* toast message */}
      <ToastContainer />
    </DashboardShell>
  );
};

export default DashboardPage;
