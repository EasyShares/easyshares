"use client";
import React, { ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { ExtendedUser } from "@/next-auth";
import { WithdrawFunds } from "@/actions/funds";
import { ScaleLoader } from "react-spinners";
interface UserInfoProps {
  user?: ExtendedUser;
}
const Withdraw = ({ user }: UserInfoProps) => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    w_amount: "",
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
    if (formData.w_amount === "") {
      toast.error("Please enter amount.");
      return;
    }
    const w_amount = parseFloat(formData.w_amount);
    if (isNaN(w_amount)) {
      toast.error("Invalid amount.");
      return;
    }
    if (w_amount < 100) {
      toast.error("Minimum withdrawal is 100 KES.");
      return;
    }
    if (w_amount > 100000) {
      toast.error("Maximum withdrawal is 100,000 KES.");
      return;
    }
    if (w_amount > user?.cash_balance) {
      toast.error("Insufficient funds.");
      return;
    }
    // Save
    startTransition(() => {
      WithdrawFunds(formData)
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
      w_amount: "",
    });
  };
  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Withdraw
        </h2>
        <p className="text-x mb-2">Withdraw funds from your account.</p>
        <p className="text-sm mb-2">Min: Ksh 100 Max: Ksh 100,000</p>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-4">
            <label
              htmlFor="w_amount"
              className="block text-gray-700 dark:text-white font-medium mb-2"
            >
              Amount
            </label>
            <input
              disabled={isPending}
              type="text"
              id="w_amount"
              className="border border-gray-300 dark:bg-gray-900 rounded-md w-full px-4 py-2 focus:outline-none focus:border-red-500"
              value={formData.w_amount}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            disabled={isPending}
            onClick={handleSubmit}
            type="button"
            className={`bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300 ease-in-out ${
              isPending
                ? "bg-red-600 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300"
            }`}
          >
            {isPending ? (
              <span className="flex justify-center items-center bg-red-600">
                <ScaleLoader
                  color="white"
                  loading={true}
                  height={20}
                  width={2}
                />
                <span className="ml-2">Requesting Withdrawal...</span>
              </span>
            ) : (
              "Withdraw"
            )}
          </button>
        </div>
      </div>
    </>
  );
};
export default Withdraw;
