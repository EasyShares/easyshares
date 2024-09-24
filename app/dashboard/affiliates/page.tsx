import React from "react";
import DashBoardNav from "@/components/DashBoardNav";
import DashBoardFooter from "@/components/DashBoardFooter";
import { Metadata } from "next";
import AffiliatesTable from "@/components/dashboard/AffiliatesTable";
import { currentUser } from "@/lib/auth";
import { getAffiliatesDataByRefferalCode } from "@/data/affiliates";

export const metadata: Metadata = {
  title: "Affiliates",
  description: "Track your refferals.",
};

const Affiliates = async () => {
  const user = await currentUser();
  const affiliates = await getAffiliatesDataByRefferalCode(user?.referralCode);
  return (
    <>
      <div className="flex flex-col  bg-gray-50 min-h-screen dark:bg-gray-900">
        <DashBoardNav user={user} />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 dark:text-white">
            My Affiliates
          </h1>
          {/* AffiliatessTable */}
          <AffiliatesTable affiliates={affiliates}></AffiliatesTable>
        </div>
        <DashBoardFooter />
      </div>
    </>
  );
};

export default Affiliates;
