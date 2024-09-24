"use client";
import { DeleteAccount } from "@/actions/account";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { ExtendedUser } from "@/next-auth";
import { ScaleLoader } from "react-spinners";
import { logout } from "@/actions/logout";

interface UserInfoProps {
  user?: ExtendedUser;
}

export const DeleteAcc = ({ user }: UserInfoProps) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: user?.id,
    email: user?.email,
  });
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async () => {
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Invalid Credentials.");
      return;
    }

    // Save
    startTransition(() => {
      DeleteAccount(formData)
        .then((data: any) => {
          const success = data.success;
          const message = data.message;
          if (success) {
            toast.success(`${message}`);
            setIsOpen(false);
            setTimeout(() => {
              logout();
            }, 2000);
          } else {
            toast.error(`${message}`);
          }
        })
        .catch((error) => {
          toast.error("An error occured, try again!");
        });
    });

    setFormData({
      id: user?.id,
      email: user?.email,
    });
  };
  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
          Delete Account
        </h2>
        <p className="text-gray-700 mb-4 dark:text-white">
          Deleting your account will permanently remove all your data. This
          action cannot be undone.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-600"
        >
          Delete Account
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white p-6 rounded-lg shadow-lg m-5">
            <h3 className="font-bold text-lg text-center mb-4">
              Confirm you want to delete your account ?
            </h3>

            <div className="flex justify-between">
              <button
                disabled={isPending}
                onClick={handleSubmit}
                type="button"
                className={`bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-300 ease-in-out ${
                  isPending
                    ? "bg-red-500 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                }`}
              >
                {isPending ? (
                  <span className="flex justify-center items-center bg-red-500">
                    <ScaleLoader
                      color="white"
                      loading={true}
                      height={20}
                      width={2}
                    />
                    <span className="ml-2">Deleting Account...</span>
                  </span>
                ) : (
                  "Confirm"
                )}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
