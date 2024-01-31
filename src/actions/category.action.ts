"use server"

import connectDB from "@/lib/db";
import { Category } from "@/models/category.model";
import { TProductCategory } from "@/types";
import { revalidatePath } from "next/cache";


// create-category
export const createCategory = async (data: TProductCategory)=>{
    const {name, slug, imageUrl, imagePublicId, trending} = data;
    if([name, slug, imageUrl, imagePublicId].some((field)=> field?.trim() === "")){
      return {success: false, message: "All field rquired!"}
    }
    await connectDB();
  
    const isExist = await Category.findOne({name});
    if(isExist) return {success: false, message: "Category exist already!"};
  
    const newCategory = new Category({name, slug, imageUrl, imagePublicId, trending});
    await newCategory.save();
    revalidatePath("/dashboard/categories");
    return { success: true, message: "Category created successfully!" };
  }


  // update-category
  export const updateCategory = async ()=>{
    return null
  }


  // delete-category
  export const deleteCategory = async (id: string)=>{
    await connectDB();
    const res = await Category.deleteOne({_id: id});
    revalidatePath("/dashboard/categories");
    return res.acknowledged;
  }
  
  // get-all-categories
  export const getCategories = async ()=>{
    try {
      await connectDB();
      const response = await Category.find().lean();
      const data = JSON.parse(JSON.stringify(response));
      return data
    } catch (error) {
      console.log("Fialed to fetch categories: ", error)
    }
  }


  // getCategory
  export const getCategory = async (id: string)=>{
    // await connectDB();
    // const response = await Category.findById(id).lean();
    // const dataToSend = JSON.parse(JSON.stringify(response));
    // console.log("category: ", dataToSend)
    // return dataToSend
  }