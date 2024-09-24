"use client";
import { toast } from "sonner";
import React from "react";
import { ExtendedUser } from "@/next-auth";
import process from "process";

interface UserInfoProps {
  user?: ExtendedUser;
}

const Affiliate = ({ user }: UserInfoProps) => {
  const referralLink = `${process.env.NEXT_PUBLIC_URL}auth/register?referralCode=${user?.referralCode}`;
  function handleCopyLink() {
    navigator.clipboard.writeText(referralLink);
    toast.success("Refferal link copied to clipboard!");
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Affiliate
        </h2>
        <p className="text-sm font-semibold text-gray-800 dark:text-white mb-4">
          Share your referral link with friends and earn 5% of their profit!
        </p>
        <div className="flex items-center bg-blue-100 dark:bg-blue-200 text-blue-500 rounded-md px-4 py-2 mb-4">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-grow bg-transparent focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md shadow-md"
          >
            Copy
          </button>
        </div>
        <p className="text-sm dark:text-white text-gray-600">
          For every person who signs up using your referral link, you&apos;ll
          earn 5% of their profit per transaction on all the shares they sell.
          Share it now and start earning!
        </p>
      </div>
    </>
  );
};

export default Affiliate;
