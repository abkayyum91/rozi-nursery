import { cn } from "@/lib/utils";

type TLabelProps = {
    labelText: string;
    forText: string;
    className?: string;
}


const Label = ({labelText, className, forText}: TLabelProps) => {
  return (
    <label htmlFor={forText} className={cn("p-1 capitalize text-sm tracking-wider", className)}>{labelText}</label>
  )
}

export default Label