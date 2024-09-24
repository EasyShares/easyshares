"use client";
import { UpdateUserInfo } from "@/actions/account";
import { ExtendedUser } from "@/next-auth";
import React, { ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { ScaleLoader } from "react-spinners";

interface UserInfoProps {
  user?: ExtendedUser;
}

const ProfileInfo = ({ user }: UserInfoProps) => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    fullname: user?.fullname || undefined,
    phone: user?.phone || undefined,
    email: user?.email || undefined,
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

  const handleSaveInfo = () => {
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please fill in all fields.");

      return;
    }

    const fullNameParts = formData.fullname.trim().split(" ");
    if (fullNameParts.length !== 2) {
      toast.error("Full Name should contain exactly two names.");

      return;
    }

    // Save
    startTransition(() => {
      UpdateUserInfo(formData)
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
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
          Profile Information
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-4">
            <label
              htmlFor="fullname"
              className="block text-gray-700 font-medium mb-2 dark:text-white"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="border border-gray-300 dark:bg-gray-900 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-4">
          <div className="md:w-1/2 pr-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2 dark:text-white"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="border border-gray-300 dark:bg-gray-900 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="md:w-1/2 pt-4 lg:pt-0">
            <div className="flex flex-row gap-2">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2 dark:text-white"
              >
                Email
              </label>
              {user?.emailVerified === null && (
                <div className="text-x text-red-600">(Not Verified)</div>
              )}
              {user?.emailVerified !== null && (
                <div className="text-x text-green-600">(Verified)</div>
              )}
            </div>
            <input
              type="email"
              id="email"
              className="border border-gray-300 dark:bg-gray-900 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              value={formData.email}
              readOnly
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            disabled={isPending}
            onClick={handleSaveInfo}
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
                <span className="ml-2">Updating details...</span>
              </span>
            ) : (
              " Save Profile Information"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
