"use server";

import connectDB from "@/lib/db";
import { Product } from "@/models/product.model";
import { TProduct } from "@/types";
import { revalidatePath } from "next/cache";

// create-products
export const createProduct = async (data: TProduct) => {
  try {
    await connectDB();
    const newProduct = new Product(data);
    await newProduct.save();
    revalidatePath("/dashboard");
    return { success: true, message: "Product created successfully!" };
  } catch (error) {
    console.log("Error during product creation: ", error);
  }
};

// edit-product
export const editProduct = async (data: TProduct) => {
  console.log("updated");
  return { success: true, message: "Product is updated successfully!" };
};

// delete-product
export const deleteProduct = async (id: string) => {
  await connectDB();
  const res = await Product.deleteOne({ _id: id });
  revalidatePath("/dashboard");
  return res.acknowledged;
};

// get-all-products
export const getAllProducts = async () => {
  try {
    await connectDB();
    const response = await Product.find().sort({ _id: -1 }).lean();
    const data = JSON.parse(JSON.stringify(response));
    return data;
  } catch (error) {
    console.log("Fialed to fetch products: ", error);
  }
};

// get-product-by-slug
export const getProductBySlug = async (slug: string) => {
  try {
    await connectDB();
    const response = await Product.find({ titleSlug: slug }).lean();
    const data = JSON.parse(JSON.stringify(response));
    return data;
  } catch (error) {
    console.log("Fialed to fetch single product: ", error);
  }
};
// get-product-by-slug
export const getProductByCategorySlug = async (categorySlug: string) => {
  try {
    await connectDB();
    const response = await Product.find({ categorySlug: categorySlug }).lean();
    if (!response.length) {
      // fetch products by using tags, when there is no products by categorySlug
      const res = await Product.find({ tags: { $in: [categorySlug] } }).lean();
      const dataByTags = JSON.parse(JSON.stringify(res));
      return dataByTags;
    }
    const data = JSON.parse(JSON.stringify(response));
    return data;
  } catch (error) {
    console.log("Fialed to fetch single product: ", error);
  }
};

// get-produts-by-type
export const getProductsByType = async (value: string) => {
  try {
    await connectDB();
    const response = await Product.find({ productType: value })
      .sort({ _id: -1 })
      .lean();
    const data = JSON.parse(JSON.stringify(response));
    return data;
  } catch (error) {
    console.log("Fialed to fetch single product: ", error);
  }
};

