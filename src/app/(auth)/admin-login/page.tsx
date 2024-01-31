import AdminLoginForm from "@/components/forms/admin-login-form";
import Link from "next/link";

const AdminLoginPage = () => {
  return (
    <div className="container h-screen w-screen flex flex-col justify-center items-center">
      <div className="flex flex-col gap-4 w-full justify-center sm:w-[320px] mx-auto border p-4 shadow-md rounded-md">
        <div className="flex justify-center items-center">
          <h1 className="text-lg lg:text-xl font-semibold">Admin Login</h1>
        </div>
        <AdminLoginForm />
        <div className="flex justify-end items-center">
          <Link href="#" className="text-sm text-primary">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
