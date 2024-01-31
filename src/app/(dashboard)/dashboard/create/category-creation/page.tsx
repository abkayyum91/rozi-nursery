import {
  CategoryCreationForm,
  DashboardHeader,
  DashboardShell,
} from "@/components";
import { ToastContainer } from "react-toastify";

const CreateCategoryPage = () => {
  return (
    <DashboardShell className="mb-5">
      <DashboardHeader
        heading="Create new category"
        text="Give a name & upload an image to create new category!"
        className="flex-col"
      ></DashboardHeader>

      <div className="grid">
        <div className="w-full max-w-md">
          <CategoryCreationForm />
        </div>
      </div>
      <ToastContainer />
    </DashboardShell>
  );
};

export default CreateCategoryPage;
