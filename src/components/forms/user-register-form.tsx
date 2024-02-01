"use client";
import { TRegisterUserSchema, registerUserSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Label } from "..";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { registerUser } from "@/actions/form-actions";
import { useState } from "react";
import { Input } from "../ui/input";

const UserRegisterForm = () => {
  const [toast, setToast] = useState({flag: false, msg: ""});
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterUserSchema>({
    resolver: zodResolver(registerUserSchema),
  });

  const processForm: SubmitHandler<TRegisterUserSchema> = async(data) => {
    const res = await registerUser(data)
    setToast({flag: res?.success!, msg: res?.message!})
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className="grid py-3 px-2">
      {/* message */}
      {toast.msg && <div className={`${toast.flag? "bg-primary/90 text-primary-foreground": "bg-destructive/90 text-destructive-foreground"} p-4 mb-2 rounded-md`}>
       <p className="text-xs font-medium">{toast.msg}</p>
      </div>}
      {/* name input */}
      <div className="flex flex-col">
        <Label labelText="Name" forText="Name" />
        <Input {...register("name")} type="text" placeholder="Your name" />
        {errors.name?.message && (
          <span className="text-xs text-destructive p-1">
            {errors.name?.message}
          </span>
        )}
      </div>
      {/* email input */}
      <div className="flex flex-col">
        <Label forText="email" labelText="Email" />
        <Input
          {...register("email")}
          type="email"
          placeholder="Enter valid email"
        />
        {errors.email?.message && (
          <span className="text-xs text-destructive p-1">
            {errors.email?.message}
          </span>
        )}
      </div>
      {/* password input */}
      <div className="flex flex-col">
        <Label forText="password" labelText="Password" />
        <Input
          {...register("password")}
          type="password"
          placeholder="Enter password"
        />
        {errors.password?.message && (
          <span className="text-xs text-destructive p-1">
            {errors.password?.message}
          </span>
        )}
      </div>
      {/* submit button */}
      <div className="flex flex-col justify-center items-center pt-4">
        <Button
          type="submit"
          className={cn("capitalize tracking-wider font-medium", isSubmitting && "opacity-50")}
          disabled={isSubmitting}
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default UserRegisterForm;
