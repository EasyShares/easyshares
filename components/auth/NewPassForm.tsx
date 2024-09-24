"use client";
import { Toaster, toast } from "sonner";
import { NewPassword } from "@/actions/new-password";
import React, { ChangeEvent, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import HidePassIcon from "../svg/HidePassIcon";
import ShowPassIcon from "../svg/ShowPassIcon";
import { ScaleLoader } from "react-spinners";

const NewPassForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
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

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    // Save
    startTransition(() => {
      NewPassword(formData, token)
        .then((data: any) => {
          const success = data.success;
          const message = data.message;
          if (success) {
            toast.success(`${message}`);
            setTimeout(() => {
              window.location.href = `/auth/login`;
            }, 3000);
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
      password: "",
    });
  };

  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Update Password
        </h2>
        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <div className="relative">
              <input
                disabled={isPending}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <ShowPassIcon /> : <HidePassIcon />}
              </button>
            </div>
          </div>

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
                <span className="ml-2">Updating Password...</span>
              </span>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
        <Link
          href="/auth/login"
          className="flex items-center justify-center text-blue-500 mt-5"
        >
          Back to Login
        </Link>
      </div>
    </>
  );
};

export default NewPassForm;
