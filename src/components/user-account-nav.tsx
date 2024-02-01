"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "./icons";
import Link from "next/link";
import { TSideNav } from "@/types";
import { signOut, useSession } from "next-auth/react";

interface UserAccountNavProps {
  items: TSideNav[];
}

const UserAccountNav = ({ items}: UserAccountNavProps) => {
  const {data: session, status} = useSession()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-8 w-8 rounded-full bg-accent text-accent-foreground flex justify-center items-center">
        <Icons.user size={20} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex justify-start items-center p-2">
          <div className="grid gap-1 leading-none">
            <p className="text-sm uppercase font-medium text-muted-foreground leading-none">
              {session?.user?.name}
            </p>
            <p className="w-[200px] text-sm lowercase text-muted-foreground truncate">
              {session?.user?.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        {items.length
          ? items.map((link, index) => {
              const Icon = Icons[link.icon || "chevronDown"];
              return (
                <DropdownMenuItem key={index} className="py-2 px-2" asChild>
                  <Link
                    href={link.disabled ? "#" : link.slug}
                    className="w-full flex justify-start items-center gap-3 text-base hover:bg-accent rounded-md"
                  >
                    <Icon size={14} />
                    {link.title}
                  </Link>
                </DropdownMenuItem>
              );
            })
          : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={()=> signOut({redirect: true, callbackUrl: "/admin-login"})} className="flex justify-start items-center gap-3 px-2 cursor-pointer text-destructive">
          <Icons.logout size={14} />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
