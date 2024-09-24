"use client";
import React from "react";
import { toast } from "sonner";
import { logout } from "@/actions/logout";

const Logout = () => {
  const handleLogout = () => {
    logout();
    toast.success("Logout successful");
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
          Sign out from your account ?
        </h2>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-md shadow-md"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Logout;
