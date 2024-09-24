import React from "react";
import DashBoardNav from "@/components/DashBoardNav";
import DashBoardFooter from "@/components/DashBoardFooter";
import AddAd from "@/components/contentmanager/AddAd";
import AdTable from "@/components/contentmanager/AdsTable";
import { RoleGate } from "@/components/auth/RoleGate";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import { getAllAds } from "@/data/content-manager";

const ManageUsers = async () => {
  const user = await currentUser();
  const ads = await getAllAds();
  return (
    <>
      <RoleGate user={user} allowedRole={UserRole.ADMIN}>
        <div className="flex flex-col  bg-gray-100 dark:bg-gray-900 min-h-screen">
          <DashBoardNav user={user}></DashBoardNav>
          <div className="container mx-auto px-4 py-8 flex-grow">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
              Manage Ads
            </h1>
            <AddAd></AddAd>
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Edit, Delete & Search Ads Information
              </h2>
              <AdTable ads={ads}></AdTable>
            </div>
          </div>
          <DashBoardFooter />
        </div>
      </RoleGate>
    </>
  );
};

export default ManageUsers;
