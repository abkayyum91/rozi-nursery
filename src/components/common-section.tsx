import { cn } from "@/lib/utils";

type TCommonSectionProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const CommonSection = ({ title, children, className="" }: TCommonSectionProps) => {
  return (
    <section className="container py-5">
      <div className="flex justify-center items-center py-5">
        <h1 className="text-lg lg:text-xl font-semibold uppercase customTextBorder tracking-wide relative">
          {title}
        </h1>
      </div>
      <div className={cn("py-2", className)}>
        {children}
      </div>
    </section>
  );
};

export default CommonSection;
