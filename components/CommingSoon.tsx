"use client";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";

const CommingSoon = ({ date, settings }: any) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:border-gray-700 dark:text-white flex flex-col justify-center items-center p-5">
      <div className="max-w-md px-8 py-12 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white shadow-lg rounded-lg text-center">
        <div className="flex flex-row items-center justify-center mb-4">
          <Image
            width={45}
            height={25}
            src="/img/logo-only.png"
            alt="Hero Image"
            className="rounded-lg"
          />
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            EasyShares
          </h1>
        </div>

        <p className="text-lg text-gray-600 dark:text-white mb-8">
          Coming Soon! Stay tuned for the launch of EasyShares, where you can
          revolutionize your share trading experience with lower cost shares,
          customizable ROI, automated matching, and immediate execution.
        </p>
        <p className="font-bold mb-5">
          Launch Date 
           {format(new Date(date), "MM/dd/yyyy ")} at{" "}
          {format(new Date(date), "p")}
        </p>
      </div>
    </div>
  );
};

export default CommingSoon;
