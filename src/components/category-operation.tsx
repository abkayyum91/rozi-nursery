"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { Modal } from ".";
import Link from "next/link";
import { removeImageAction } from "@/actions/form-actions";
import { deleteCategory } from "@/actions/category.action";
import { toast } from "react-toastify";
import { TProductCategory } from "@/types";

interface CategoryOperationProps {
  data: TProductCategory;
}

const CategoryOperation = ({ data }: CategoryOperationProps) => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const cloudRes = await removeImageAction(data.imagePublicId);
    const dbRes = await deleteCategory(data._id as string);
    if (!cloudRes?.success || !dbRes)
      return toast.info("Error in deletion!", { theme: "colored" });
    toast.info("Deleted successfully!", { theme: "colored" });
    setShowDeleteModal(false);
    setIsDeleting(false);
  };

  return (
    <>
      <div className="flex justify-end gap-2">
        <Link
          href={`#`}
          className="border border-border bg-accent rounded-md flex justify-center items-center gap-1 py-1 px-2 cursor-pointer text-xs font-mono"
        >
          <Icons.edit size={12} className="text-primary" />
          Edit
        </Link>
        <span
          className="cursor-pointer border border-border rounded-md bg-destructive text-destructive-foreground flex justify-center items-center gap-1 py-1 px-2 text-xs font-mono"
          onClick={() => setShowDeleteModal(!showDeleteModal)}
        >
          <Icons.trash size={12} />
          Delete
        </span>
      </div>
      {showDeleteModal && (
        <Modal
          onClose={() => setShowDeleteModal(!showDeleteModal)}
          title="Are you sure you want to delete?"
        >
          <div className="w-full">
            <p className="text-sm text-muted-foreground">
              This action can not be reverted.
            </p>
            <div className="flex gap-4 justify-end items-center mt-10">
              <Button
                variant={"secondary"}
                className="text-xs"
                onClick={() => setShowDeleteModal(!showDeleteModal)}
              >
                Cancel
              </Button>
              <Button
                variant={"destructive"}
                className="text-xs flex items-center gap-2"
                onClick={handleDelete}
              >
                {isDeleting ? (
                  <Icons.spinner size={12} className="animate-spin" />
                ) : (
                  <Icons.trash size={12} />
                )}
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CategoryOperation;
