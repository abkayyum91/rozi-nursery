"use client";
import { TLoginUserSchema, loginUserSchema } from "@/lib/zod-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input, Label } from "..";
import { Button, buttonVariants } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";
import { getUserRole } from "@/actions/form-actions";
import { ToastContainer, toast } from 'react-toastify';


const AdminLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginUserSchema>({
    resolver: zodResolver(loginUserSchema),
  });

  const processForm: SubmitHandler<TLoginUserSchema> = async (data) => {
    const res = await getUserRole(data)
    if(res !== "admin") return toast.error("You did't have authority!", {theme: "colored"});
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <form className="grid gap-4" onSubmit={handleSubmit(processForm)}>
      {/* toast message */}
      <ToastContainer position="top-center"/>

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

      {/* email input */}
      <div className="grid">
        <Label forText="email" labelText="Email" />
        <Input {...register("email")} type="email" placeholder="Enter email" />
        {errors.email?.message && (
          <span className="text-xs text-destructive p-1">
            {errors.email?.message}
          </span>
        )}
      </div>
      {/* password input */}
      <div className="grid">
        <Label forText="password" labelText="Password" />
        <Input
          {...register("password")}
          type="password"
          placeholder="Password"
        />
        {errors.password?.message && (
          <span className="text-xs text-destructive p-1">
            {errors.password?.message}
          </span>
        )}
      </div>
      {/* submit button */}
      <Button
        type="submit"
        className="capitalize tracking-wider font-medium"
        disabled={isSubmitting}
      >
        Login
      </Button>
    </form>
  );
};

export default AdminLoginForm;
