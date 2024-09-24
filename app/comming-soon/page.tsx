import React from "react";
import { Metadata } from "next";
import { getAllSettings } from "@/data/content-manager";
import Image from "next/image";
import { format } from "date-fns";

export const metadata: Metadata = {
  title: "Coming Soon",
};

const Page = async () => {
  const settings: any = await getAllSettings();
  const date = settings?.commingSoonAt;

  // Check if the date is valid
  let launchDate;
  try {
    launchDate = date ? format(new Date(date), "p") : "TBA"; // TBA (To Be Announced) if date is missing or invalid
  } catch (error) {
    console.error("Invalid date value:", date);
    launchDate = "TBA"; // Fallback in case of an invalid date
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-5">
      <div className="max-w-md px-8 py-12 bg-white shadow-lg rounded-lg text-center">
        <div className="flex flex-row items-center justify-center mb-4">
          <Image
            width={45}
            height={25}
            src="/img/logo-only.png"
            alt="Hero Image"
            className="rounded-lg"
          />
          <h1 className="text-3xl font-bold text-gray-800">EasyShares</h1>
        </div>

        <p className="text-lg text-gray-600 mb-8">
          Coming Soon! Stay tuned for the launch of EasyShares, where you can
          revolutionize your share trading experience with lower cost shares,
          customizable ROI, automated matching, and immediate execution.
        </p>
        <p className="font-bold">Launch Date: {launchDate}</p>
      </div>
    </div>
  );
};

export default Page;
