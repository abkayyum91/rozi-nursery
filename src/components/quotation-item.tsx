import Link from "next/link";
import { Icons } from "./icons";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { TQuotation } from "@/types";
import { QuotationOperation } from ".";

interface QuotationItemProps {
  quote: TQuotation;
}

const QuotationItem = async ({ quote }: QuotationItemProps) => {
  let totalAmt = 0;
  if (quote.quotedProducts[0].price) {
    quote.quotedProducts.map((item) => (totalAmt += item.qty! * item.price!));
  }
  return (
    <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-10">
      <div className="w-full grid lg:basis-[50%]">
        <div className="w-full flex justify-between gap-4 items-start">
          <div className="grid">
            <h2 className="uppercase text-base lg:text-lg font-semibold">
              {quote.fullName}
            </h2>
            <Link
              href={`tel:${quote.mobileNumber}`}
              className="text-primary text-base flex items-center gap-2"
            >
              <Icons.call size={16} />
              {quote.mobileNumber}
            </Link>
          </div>
          <QuotationOperation id={quote._id!}/>
        </div>
        {quote.message ? (
          <p className="pt-2 text-sm text-justify text-muted-foreground">
            {quote.message}
          </p>
        ) : (
          <p className="pt-5 text-sm text-muted-foreground font-mono">
            No, message is attached with this quotation.
          </p>
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="p-2 w-[40px]">#</TableHead>
            <TableHead className="w-[110px] lg:w-auto">Desc</TableHead>
            <TableHead className="p-2">QTY</TableHead>
            <TableHead className="p-2">Price</TableHead>
            <TableHead className="p-2 text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        {totalAmt > 0 ? (
          <>
            <TableBody>
              {quote.quotedProducts.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="p-2 font-medium">{index + 1}</TableCell>
                  <TableCell className="py-2 px-0 lg:px-4">
                    <Image
                      src={item.imageUrl!}
                      alt="product image"
                      width={50}
                      height={50}
                    />
                    <p className="text-xs lg:text-sm capitalize line-clamp-3">
                      {item.prodName}
                    </p>
                  </TableCell>
                  <TableCell className="p-2">{item.qty}</TableCell>
                  <TableCell className="p-2">{item.price}</TableCell>
                  <TableCell className="p-2 text-right">
                    {item.price! * item.qty!}.00
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="p-2">
                  Total
                </TableCell>
                <TableCell colSpan={2} className="p-2 text-right">
                  &#8377; {totalAmt}.00
                </TableCell>
              </TableRow>
            </TableFooter>
          </>
        ) : (
          <TableCaption className="text-base text-muted-foreground font-mono">
            No, product is attched with this quotation!
          </TableCaption>
        )}
      </Table>
    </div>
  );
};

export default QuotationItem;
