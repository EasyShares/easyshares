"use client";
import React from "react";

const UnderMaintenance = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:text-white flex flex-col justify-center items-center">
        <div className="max-w-md px-8 py-12 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white shadow-lg rounded-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Under Maintenance
          </h1>
          <p className="text-lg text-gray-600 dark:text-white mb-8">
            We apologize for the inconvenience, but EasyShares is currently
            undergoing maintenance to improve your experience. We&apos;ll be
            back online shortly. Thank you for your patience.
          </p>
        </div>
      </div>
    </>
  );
};

export default UnderMaintenance;
