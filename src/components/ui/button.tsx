import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center text-sm justify-center whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground rounded hover:scale-95 duration-300",
        secondary: "bg-secondary text-secondary-foreground rounded",
        destructive: "bg-destructive text-destructive-foreground rounded",
        outline: "border border-input bg-background rounded hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded",
        link: "text-primary underline-offset-4 hover:underline",
        linkPrimary: "bg-primary text-primary-foreground rounded hover:scale-95 duration-300",
        linkPrimaryOutline: "border rounded border-primary hover:scale-95 hover:bg-primary hover:text-primary-foreground duration-300",
      },
      size: {
        default: "px-4 py-2",
        lg: "px-5 py-3",
        sm: "px-3 py-2",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
