"use client";
import React, { ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { ScaleLoader } from "react-spinners";
import { UpdateUserPassword } from "@/actions/account";

const ChangePass = () => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    const { newPassword, confirmPassword, currentPassword } = formData;

    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 6 || currentPassword.length < 6) {
      toast.error("New password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password must match.");
      return;
    }

    // Save
    startTransition(() => {
      UpdateUserPassword(formData)
        .then((data: any) => {
          const success = data.success;
          const message = data.message;
          if (success) {
            toast.success(`${message}`);
          } else {
            toast.error(`${message}`);
          }
        })
        .catch((error) => {
          toast.error("An error occured, try again!");
        });
    });

    // Reset form data
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
          Change Password
        </h2>
        <div className="mt-4">
          <label
            htmlFor="currentPassword"
            className="block text-gray-700 font-medium mb-2 dark:text-white"
          >
            Current Password
          </label>
          <input
            type="password"
            id="currentPassword"
            className="border border-gray-300 dark:bg-gray-900 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            value={formData.currentPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="newPassword"
            className="block text-gray-700 font-medium mb-2 dark:text-white"
          >
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            className="border border-gray-300 dark:bg-gray-900 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 font-medium mb-2 dark:text-white"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="border border-gray-300 dark:bg-gray-900 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="mt-6">
          <button
            disabled={isPending}
            onClick={handleSubmit}
            type="button"
            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300 ease-in-out ${
              isPending
                ? "bg-blue-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            }`}
          >
            {isPending ? (
              <span className="flex justify-center items-center bg-blue-600">
                <ScaleLoader
                  color="white"
                  loading={true}
                  height={20}
                  width={2}
                />
                <span className="ml-2">Updating Password...</span>
              </span>
            ) : (
              "Change Password"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ChangePass;
