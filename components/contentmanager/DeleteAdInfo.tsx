"use client";
import { DeleteAdData } from "@/actions/content-manager";
import React, { useState, useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";

interface Props {
  Id: any;
  onClose: any;
}

const DeleteAd: React.FC<Props> = ({ Id, onClose }) => {
  const [isPending, startTransition] = useTransition();
  const closeModal = () => {
    onClose();
  };
  const id = Id.id;

  const [formData, setFormData] = useState({
    id: id,
  });
  const handleSubmit = () => {
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Empty params.");
      return;
    }

    // Save
    startTransition(() => {
      DeleteAdData(formData)
        .then((data: any) => {
          const success = data.success;
          const message = data.message;
          if (success) {
            toast.success(`${message}`);
            closeModal();
          } else {
            toast.error(`${message}`);
          }
        })
        .catch((error) => {
          toast.error("An error occured, try again!");
        });
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white p-6 rounded-lg shadow-lg m-5">
          <h3 className="font-bold text-lg text-center mb-4 flex justify-center items-center flex-col">
            Confirm deletion of Ad ID: {Id.id}
          </h3>
          <div className="flex justify-between">
            <button
              disabled={isPending}
              onClick={handleSubmit}
              type="button"
              className={` px-4 py-2 text-white font-semibold  rounded-md text-sm transition-colors duration-300 ease-in-out ${
                isPending
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300"
              }`}
            >
              {isPending ? (
                <span className="flex justify-center items-center bg-green-500">
                  <ScaleLoader
                    color="white"
                    loading={true}
                    height={20}
                    width={2}
                  />
                  <span className="ml-2">Deleting Ad Info...</span>
                </span>
              ) : (
                "Confirm"
              )}
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAd;
