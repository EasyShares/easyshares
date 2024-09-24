"use client";
import { EditUserData } from "@/actions/content-manager";
import React, { ChangeEvent, useState, useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";

interface Props {
  Id: any;
  onClose: any;
}

const EditUser: React.FC<Props> = ({ Id, onClose }) => {
  const [isPending, startTransition] = useTransition();
  const closeModal = () => {
    onClose();
  };

  const phone = Id.phone;
  const email = Id.email;
  const cash_balance = Id.cash_balance;
  const shares_balance = Id.shares_balance;
  const role = Id.role;
  const refferer = Id.refferer;
  const fullName = Id.fullName;

  const [formData, setFormData] = useState({
    phone: phone,
    email: email,
    cash_balance: cash_balance,
    shares_balance: shares_balance,
    fullName: fullName,
    refferer: refferer,
    role: role,
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

    // Save
    startTransition(() => {
      EditUserData(formData)
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
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Edit Asset Information ID: {Id.id}
          </h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 pr-4">
              <label
                htmlFor="phone"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Phone
              </label>
              <input
                disabled={isPending}
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
                disabled={isPending}
                type="email"
                id="email"
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-4">
            <div className="md:w-1/2 pr-4">
              <label
                htmlFor="cash_balance"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Cash Balance
              </label>
              <input
                disabled={isPending}
                type="text"
                id="cash_balance"
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.cash_balance}
              />
            </div>
            <div className="md:w-1/2 pt-4 lg:pt-0">
              <label
                htmlFor="shares_balance"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Shares Balance
              </label>
              <input
                disabled={isPending}
                type="text"
                id="shares_balance"
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.shares_balance}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-4">
            <div className="md:w-1/2 pr-4">
              <label
                htmlFor="fullName"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                disabled={isPending}
                type="text"
                id="fullName"
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.fullName}
              />
            </div>
            <div className="md:w-1/2 pt-4 lg:pt-0">
              <label
                htmlFor="refferer"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Referrer ID
              </label>
              <input
                disabled={isPending}
                type="text"
                id="refferer"
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.refferer}
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
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
          </div>
          <div className="flex justify-between mt-5 flex-wrap">
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
                  <span className="ml-2">Saving Changes...</span>
                </span>
              ) : (
                "Save Changes"
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

export default EditUser;
