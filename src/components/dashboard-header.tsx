import { cn } from "@/lib/utils";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

const DashboardHeader = ({ heading, text, children, className }: DashboardHeaderProps) => {
  return (
    <div className={cn("flex gap-4 justify-between items-start", className)}>
      <div className="grid gap-2">
        <h1 className="capitalize text-3xl md:text-4xl font-semibold">{heading}</h1>
        <p className="text-base md:text-lg text-muted-foreground">{text}</p>
      </div>
      {children}
    </div>
  );
};

export default DashboardHeader;
