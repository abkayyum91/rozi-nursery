import { getCategories } from "@/actions/category.action";
import {
  DashboardHeader,
  DashboardShell,
  ProductCreationForm,
} from "@/components";
import { TProductCategory } from "@/types";
import { ToastContainer } from "react-toastify";


const CreateProductPage = async() => {
  const categories:TProductCategory[] = await getCategories();

  return (
    <DashboardShell className="mb-5">
      <DashboardHeader
        heading="Create new product"
        text="Fill the below form to create new product!"
        className="flex-col"
      ></DashboardHeader>

      <div className="grid">
        <div className="w-full sm:max-w-lg p-4 border-2 rounded-md border-dashed bg-muted text-muted-foreground">
          <ProductCreationForm categories={categories} />
        </div>
      </div>
      <ToastContainer/>
    </DashboardShell>
  );
};

export default CreateProductPage;
