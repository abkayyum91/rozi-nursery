"use client";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input, Label } from "..";
import { Button } from "../ui/button";
import { cn, generateSlug } from "@/lib/utils";
import { Icons } from "../icons";
import { useState } from "react";
import Image from "next/image";
import { removeImageAction } from "@/actions/form-actions";
import { toast } from "react-toastify";
import { TProductCategory } from "@/types";
import { createCategory } from "@/actions/category.action";

const CategoryCreationForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [publicId, setPublicId] = useState("");
  const [removeStatus, setRemoveStatus] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TProductCategory>();

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

  const processForm: SubmitHandler<TProductCategory> = async (data) => {
    data.imageUrl = imageUrl;
    data.imagePublicId = publicId;
    data.slug = generateSlug(data.name);

    const res = await createCategory(data);
    if (!res.success) return toast.error(res.message, { theme: "colored" });
    toast.success(res.message, { theme: "colored" });
    setImageUrl("");
    setPublicId("");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(processForm)} className="grid gap-3">
      {/* category name */}
      <div className="grid">
        <Label forText="categoryName" labelText="Category Name" />
        <Input
          {...register("name", {
            required: "Category name is required.",
          })}
          type="text"
          placeholder="Enter category name"
        />
        {errors.name && (
          <span className="text-xs text-destructive p-1">
            {errors.name.message}
          </span>
        )}
      </div>
      {/* upload image */}
      <div className="grid">
        <CldUploadButton
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          onUpload={handleImageUpload}
          className={`h-48 border-2 border-dashed rounded-md bg-muted text-muted-foreground grid place-items-center relative ${
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
      {/* trending checkbox */}
      <div className="grid">
        <div className="flex items-center gap-4 py-2">
          <input
            {...register("trending")}
            type="checkbox"
            name="trending"
            className="h-5 w-5"
          />
          <Label
            forText="trending"
            labelText="Trending"
            className="text-sm p-0 lg:text-base font-medium"
          />
        </div>
      </div>
      {/* submit button */}
      <div className="grid">
        <Button
          type="submit"
          className={cn("capitalize tracking-wide font-medium w-full")}
          disabled={isSubmitting || !imageUrl || !publicId}
        >
          Create
        </Button>
      </div>
    </form>
  );
};

export default CategoryCreationForm;
