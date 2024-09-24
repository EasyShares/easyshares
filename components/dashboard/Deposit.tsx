"use client";
import React, { ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { DepositFunds } from "@/actions/funds";
import { ScaleLoader } from "react-spinners";

const Deposit = () => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    amount: "",
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
    if (formData.amount === "") {
      toast.error("Please enter amount.");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount)) {
      toast.error("Invalid amount!");
      return;
    }

    if (amount < 375) {
      toast.error("Minimum deposit is 375 KES.");
      return;
    }

    if (amount > 100000) {
      toast.error("Maximum deposit is 100,000 KES.");
      return;
    }

    // Save
    startTransition(() => {
      DepositFunds(formData)
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
      amount: "",
    });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold dark:text-white text-gray-800 mb-4">
          Deposit
        </h2>
        <p className="text-x mb-2">Deposit funds into your account.</p>
        <p className="text-sm mb-2">Min: Ksh 375 Max: Ksh 100,000</p>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 dark:text-white font-medium mb-2"
            >
              Amount
            </label>
            <input
              disabled={isPending}
              type="text"
              id="amount"
              className="border border-gray-300 dark:bg-gray-900 rounded-md w-full px-4 py-2 focus:outline-none focus:border-green-500"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            disabled={isPending}
            onClick={handleSubmit}
            type="button"
            className={`bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300 ease-in-out ${
              isPending
                ? "bg-green-600 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300"
            }`}
          >
            {isPending ? (
              <span className="flex justify-center items-center bg-green-600">
                <ScaleLoader
                  color="white"
                  loading={true}
                  height={20}
                  width={2}
                />
                <span className="ml-2">Initiating Deposit...</span>
              </span>
            ) : (
              "Deposit"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Deposit;
