"use client";
import { useLockBody } from "@/hooks/use-lock-body";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

interface TModalProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
  closeOuter?: boolean;
  maxWidth?: string;
}

const Modal = ({children, onClose, title, maxWidth, closeOuter = false,}: TModalProps) => {
  useLockBody();
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((e.target as HTMLDivElement).id === "modal-overlay" && closeOuter) {
      onClose();
    }
  };

  return (
    createPortal(
      <div
        onClick={handleClick}
        className="fixed inset-0 overflow-y-auto flex justify-center items-center bg-black/[0.8] z-50"
        id="modal-overlay"
      >
        {/* modal */}
        <div
          className={cn(
            "bg-card text-card-foreground m-4 p-4 max-w-lg w-full rounded-md grid gap-5",
            maxWidth
          )}
        >
          {/* modal header */}
          <div className="flex justify-between items-start gap-5">
            <div className="flex justify-start items-center">
              <h1 className="capitalize text-base lg:text-lg font-semibold tracking-wide">
                {title}
              </h1>
            </div>
            <div
              className="flex justify-center items-start w-5 cursor-pointer"
              onClick={() => onClose()}
            >
              <p className="text-destructive text-xl">&times;</p>
            </div>
          </div>

          {/* modal content */}
          <div className="flex justify-center items-center">
            {children}
          </div>
        </div>
      </div>,
      document.body
    )
  );
};

export default Modal;
