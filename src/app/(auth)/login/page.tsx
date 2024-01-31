import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";


const LoginPage = () => {
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
      <div className="flex flex-col w-full justify-center sm:w-[350px] mx-auto">
        <div className="flex justify-center items-center pb-5">
          <Icons.plant size={32} />
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-lg lg:text-xl font-semibold">Welcome back</h1>
        </div>
        {/* <UserLoginForm /> */}
        <div className="flex justify-center items-center py-2 text-sm text-muted-foreground">
            Don&apos; have account?<Link href="/register" className="text-base text-primary pl-2"> Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
