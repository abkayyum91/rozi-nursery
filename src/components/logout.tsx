"use client";

import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

interface LogOutProps {
  className?: string;
  role: string;
}

const LogOut = ({ role, className }: LogOutProps) => {
  return (
    <Button
      variant={"destructive"}
      className={cn(
        "flex justify-center items-center gap-2 text-base",
        className
      )}
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: role == "admin" ? "/admin-login" : "/login",
        })
      }
    >
      <Icons.logout size={14} />
      Sign out
    </Button>
  );
};

export default LogOut;
