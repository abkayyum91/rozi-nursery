"use server";

import connectDB from "@/lib/db";
import { Quotation } from "@/models/quotation.model";
import { TQuotation } from "@/types";
import { revalidatePath } from "next/cache";

// send-quotation-action
export const sendQuotationAction = async (data: TQuotation) => {
  try {
    await connectDB();
    const newQuote = new Quotation(data);
    newQuote.save();
    revalidatePath("/dashboard/quotations");
    return {
      success: true,
      message: "Your quotation has been sent successfully!",
    };
  } catch (error) {
    console.log("Error in sending quotaion: ", error);
  }
};

// get-all-quotation
export const getAllQuotations = async ()=>{
  try {
    await connectDB();
    const res = await Quotation.find().sort({_id:-1}).lean();
    const data = JSON.parse(JSON.stringify(res));
    return data;
  } catch (error) {
    console.log("Error in fetching quotations: ", error)
  }
}

// delete quotation 
export const deleteQuotation= async (id: string)=>{
  await connectDB();
  const res = await Quotation.deleteOne({ _id: id });
  revalidatePath("/dashboard/quotations");
  return res.acknowledged;
}

