"use client";

import React, { ChangeEvent, useState, useTransition } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { ResetPassword } from "@/actions/reset-password";
import { ScaleLoader } from "react-spinners";

const ResetPassForm = () => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Email format is invalid.");
      return;
    }

    // Save
    startTransition(() => {
      ResetPassword(formData)
        .then((data: any) => {
          const success = data.success;
          const message = data.message;
          if (success) {
            toast.success(`${message}`, {
              description: data.info,
              duration: 15000,
            });
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
      email: "",
    });
  };
  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Reset Password
        </h2>
        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email Address
            </label>
            <input
              disabled={isPending}
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
            />
          </div>

          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Remembered password?{" "}
            <Link href="login" className="text-blue-500">
              Sign In
            </Link>
          </p>
          <button
            disabled={isPending}
            onClick={handleSubmit}
            type="button"
            className={`w-full py-3 px-6 text-white font-medium rounded-md text-sm transition-colors duration-300 ease-in-out ${
              isPending
                ? "bg-green-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
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
                <span className="ml-2">Sending Reset Password Email...</span>
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default ResetPassForm;
