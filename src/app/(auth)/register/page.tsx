import Link from "next/link";

import { Icons } from "@/components/icons";
import UserRegisterForm from "@/components/forms/user-register-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
};

export default function RegisterPage() {
  return (
    <div className="container h-screen w-screen flex flex-col justify-center items-center">
      {/* go back button */}
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="flex flex-col w-full mx-auto justify-center sm:w-[350px] ">
        <div className="flex justify-center items-center pb-5">
          <Icons.plant size={32} />
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-lg lg:text-xl font-semibold">Create an account</h1>
        </div>
        <UserRegisterForm/>
        <div className="flex justify-center items-center py-2 text-sm text-muted-foreground">
            Already have account?<Link href="/login" className="text-base text-primary pl-2"> Login</Link>
        </div>
      </div>
    </div>
  );
}
