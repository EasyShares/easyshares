"use client";
import React, { ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { RegisterUser } from "@/actions/content-manager";
import { ScaleLoader } from "react-spinners";

const AddUser = () => {
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    fullName: "",
    uplineCode: "",
    phone: "",
    email: "",
    role: "",
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

  const handleSubmit = () => {
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please fill in all fields.");

      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Email format is invalid.");

      return;
    }

    const fullNameParts = formData.fullName.trim().split(" ");
    if (fullNameParts.length !== 2) {
      toast.error("Full Name should contain exactly two names.");

      return;
    }

    if (!/^(2547\d{8}|2541\d{8}|07\d{8}|01\d{8})$/.test(formData.phone)) {
      toast.error("Phone number format is invalid.");

      return;
    }

    // save
    startTransition(() => {
      RegisterUser(formData)
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
          toast.error("An error occured, try again");
        });
    });

    setFormData({
      fullName: "",
      uplineCode: "",
      phone: "",
      email: "",
      role: "",
      password: "",
    });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Add User
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-4">
            <label
              htmlFor="fullName"
              className="block dark:text-white text-gray-700 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.fullName}
            />
          </div>
          <div className="md:w-1/2 pt-4 lg:pt-0">
            <label
              htmlFor="uplineCode"
              className="block dark:text-white text-gray-700 font-medium mb-2"
            >
              Referrer ID
            </label>
            <input
              type="text"
              id="uplineCode"
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.uplineCode}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-4">
          <div className="md:w-1/2 pr-4">
            <label
              htmlFor="phone"
              className="block dark:text-white text-gray-700 font-medium mb-2"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.phone}
            />
          </div>
          <div className="md:w-1/2 pt-4 lg:pt-0">
            <label
              htmlFor="email"
              className="block dark:text-white text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.email}
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label
            htmlFor="Role"
            className="block dark:text-white text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <input
              disabled={isPending}
              type="text"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <label
            htmlFor="Role"
            className="block dark:text-white text-gray-700 font-medium mb-2"
          >
            Role
          </label>
          <select
            disabled={isPending}
            className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
            id="role"
            onChange={handleChange}
            value={formData.role}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div className="mt-6">
          <button
            disabled={isPending}
            onClick={handleSubmit}
            type="button"
            className={` py-3 px-6 text-white font-medium rounded-md text-sm transition-colors duration-300 ease-in-out ${
              isPending
                ? "bg-green-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
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
                <span className="ml-2">Creating Account...</span>
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddUser;
