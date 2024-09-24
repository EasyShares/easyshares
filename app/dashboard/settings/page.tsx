import React from "react";
import DashBoardNav from "@/components/DashBoardNav";
import DashBoardFooter from "@/components/DashBoardFooter";
import Affiliate from "@/components/dashboard/Affiliate";
import { Metadata } from "next";
import Logout from "@/components/dashboard/Logout";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Customize your EasyShares experience. Adjust preferences, privacy settings to suit your needs.",
};

const Settings = async () => {
  const user = await currentUser();
  return (
    <>
      <div className="flex flex-col  bg-gray-50 min-h-screen dark:bg-gray-900">
        <DashBoardNav user={user} />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 dark:text-white">
            Settings
          </h1>

          {/* Affiliate */}
          <Affiliate user={user}></Affiliate>

          {/* Logout */}
          <Logout></Logout>
        </div>

        <DashBoardFooter />
      </div>
    </>
  );
};

export default Settings;
