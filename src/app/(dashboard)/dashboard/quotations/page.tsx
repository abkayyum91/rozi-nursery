import { getAllQuotations } from "@/actions/quotation.action";
import { DashboardHeader, DashboardShell, QuotationItem } from "@/components";
import { TQuotation } from "@/types";
import { ToastContainer } from "react-toastify";


const DashboardQuotationsPage = async() => {
  const quotations:TQuotation[] = await getAllQuotations()
  return (
    <DashboardShell className="pb-10">
      <DashboardHeader
        heading="Quotaions"
        text="Manage quotations and perform accordingly."
        className="flex-col"
      />

      {/* quotations */}
      {quotations.length > 0 ?
      <div className="grid gap-5">
        {quotations.map((item, index)=> (
        <QuotationItem key={index} quote={item} />
        ))}
      </div>
       : 
       <div className="text-2xl text-muted-foreground flex justify-center items-center py-10">Oops! there is no quotation</div>}
       {/* toast message */}
       <ToastContainer/>
    </DashboardShell>
  );
};

export default DashboardQuotationsPage;


