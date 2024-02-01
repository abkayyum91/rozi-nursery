"use client";

import Select from "react-select";
import { Label } from "..";
import { Button } from "../ui/button";
import { productTypeOptionsConfig, tagOptionsConfig } from "@/config/options";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { generateSlug, getCatgoryOptions } from "@/lib/utils";
import { TProduct, TProductCategory, productFormValue } from "@/types";
import { removeImageAction } from "@/actions/form-actions";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import { Icons } from "../icons";
import { createProduct } from "@/actions/product.action";
import { toast } from "react-toastify";
import { Input } from "../ui/input";

interface ProductCreationFormProps {
  categories: TProductCategory[];
}

const ProductCreationForm = ({ categories }: ProductCreationFormProps) => {
  const categoryOptions = getCatgoryOptions(categories);
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [removeStatus, setRemoveStatus] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<productFormValue>();

  const handleImageUpload = (result: CldUploadWidgetResults) => {
    const info = result.info as object;
    if ("secure_url" in info && "public_id" in info) {
      const url = info.secure_url as string;
      const public_id = info.public_id as string;
      setImageUrl(url);
      setPublicId(public_id);
    }
  };

  const removeImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setRemoveStatus(true);
    const res = await removeImageAction(publicId);
    if (res?.success) {
      setImageUrl("");
      setPublicId("");
      setRemoveStatus(false);
    }
  };

  const processForm: SubmitHandler<productFormValue> = async (data) => {
    const newProduct: TProduct = {
      productType: data.prodType.value,
      title: data.title,
      titleSlug: generateSlug(data.title),
      category: data.category.value,
      categorySlug: generateSlug(data.category.value),
      bestSeller: data.bestSeller,
      mrp: data.mrp,
      price: data.price,
      tags: data.tags.map((item) => item.value),
      imageUrl: imageUrl,
      imagePublicId: publicId,
      desc: data.desc,
    };
    const res = await createProduct(newProduct);
    if (!res?.success)
      return toast.error("Something went wrong!", { theme: "colored" });
    toast.success(res.message, { theme: "colored" });
    setImageUrl("");
    setPublicId("");
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(processForm)}
      className="grid gap-2 bg-muted text-muted-foreground"
    >
      {/* product-type & category input */}
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div className="grid basis-1/2">
          <Label
            forText="prodType"
            labelText="Product Type"
            className="text-base"
          />
          <Controller
            name="prodType"
            control={control}
            render={({ field }) => (
              <Select {...field} options={productTypeOptionsConfig} />
            )}
          />
        </div>
        <div className="grid basis-1/2">
          <Label
            forText="category"
            labelText="Product Category"
            className="text-base"
          />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select {...field} options={categoryOptions} />
            )}
          />
        </div>
      </div>
      {/* product title input */}
      <div className="grid">
        <Label
          forText="title"
          labelText="Product Title"
          className="text-base"
        />
        <Input
          {...register("title", { required: "Product title is required!" })}
          type="text"
          placeholder="Enter product title"
          className="bg-background"
        />
        {errors.title?.message && (
          <span className="text-xs text-destructive p-1">
            {errors.title.message}
          </span>
        )}
      </div>
      {/* mrp & price input */}
      <div className="flex justify-between gap-5">
        <div className="grid">
          <Label forText="mrp" labelText="MRP." className="text-base" />
          <Input
            {...register("mrp", { required: "MRP. required!" })}
            type="number"
            placeholder="Enter mrp"
            className="bg-background"
          />
          {errors.mrp?.message && (
            <span className="text-xs text-destructive p-1">
              {errors.mrp.message}
            </span>
          )}
        </div>
        <div className="grid">
          <Label forText="price" labelText="Price" className="text-base" />
          <Input
            {...register("price", { required: "Price required!" })}
            type="number"
            placeholder="Enter price"
            className="bg-background"
          />
          {errors.price?.message && (
            <span className="text-xs text-destructive p-1">
              {errors.price.message}
            </span>
          )}
        </div>
      </div>
      {/* product tag input */}
      <div className="grid">
        <Label forText="tag" labelText="Select tags" className="text-base" />
        <Controller
          name="tags"
          control={control}
          render={({ field }) => (
            <Select {...field} isMulti options={tagOptionsConfig} />
          )}
        />
      </div>
      {/* product-image input */}
      <div className="grid">
        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onUpload={handleImageUpload}
          className={`h-48 border-2 border-dashed rounded-md bg-background text-foreground grid place-items-center relative ${
            imageUrl && "pointer-events-none"
          }`}
        >
          <div className="flex flex-col gap-1 justify-center items-center">
            <Icons.uploadCloud size={28} className="text-primary/70" />
            Upload image
          </div>
          {imageUrl && (
            <Image
              src={imageUrl}
              fill
              className="absolute inset-0 object-cover rounded-md"
              alt="Product image."
            />
          )}
        </CldUploadButton>
        {/* remove image */}
        {publicId && (
          <Button
            onClick={removeImage}
            variant={"destructive"}
            className="my-2 w-fit py-1.5 px-2 text-xs"
          >
            {removeStatus ? "Removing..." : "Remove image"}
          </Button>
        )}
      </div>
      {/* description input */}
      <div className="grid">
        <Label
          forText="desc"
          labelText="Product Description"
          className="text-base"
        />
        <textarea
          {...register("desc")}
          placeholder="Enter product description..."
          className="flex w-full rounded-md border border-input bg-background py-2 px-3 mb-1 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          rows={4}
        />
      </div>
      {/* best-seller checkbox */}
      <div className="grid">
        <div className="flex items-center gap-4 py-2">
          <input
            {...register("bestSeller")}
            type="checkbox"
            name="bestSeller"
            className="h-5 w-5"
          />
          <Label
            forText="bestSeller"
            labelText="Best seller"
            className="text-sm p-0 lg:text-base leading-tight"
          />
        </div>
      </div>
      {/* submit button */}
      <div className="grid my-2">
        <Button type="submit" disabled={isSubmitting || !imageUrl || !publicId}>
          {isSubmitting ? "Creating..." : "Create new"}
        </Button>
      </div>
    </form>
  );
};

export default ProductCreationForm;
