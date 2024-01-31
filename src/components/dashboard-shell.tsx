import { cn } from "@/lib/utils";

interface DashboardShellProps
  extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const DashboardShell = ({
  children,
  className,
  ...props
}: DashboardShellProps) => {
  return (
    <div className={cn("grid gap-8 items-start", className)} {...props}>
      {children}
    </div>
  );
};

export default DashboardShell;
