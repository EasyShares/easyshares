import React from "react";
import DashBoardNav from "@/components/DashBoardNav";
import DashBoardFooter from "@/components/DashBoardFooter";
import AllAssets from "@/components/dashboard/AllAssets";
import { Metadata } from "next";
import YourPortfolio from "@/components/dashboard/YourPortfolio";
import RecentActivity from "@/components/dashboard/RecentActivity";
import Banner from "@/components/ads/Banner";
import { currentUser } from "@/lib/auth";
import {
  getExchangesByUserSession,
  getPortfolioByUserSession,
} from "@/data/user";
import { getAllAds } from "@/data/content-manager";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Access your personalized dashboard on EasyShares to manage your account, track investments, and explore new opportunities. Stay updated with real-time data and insights tailored to your financial goals.",
};

const DashBoard = async () => {
  const user = await currentUser();
  const portfolio = await getPortfolioByUserSession(user?.email);
  const exchanges = await getExchangesByUserSession(user?.email);
  const ads = await getAllAds();
  return (
    <>
      <div className="bg-gray-50 flex flex-col min-h-screen w-full dark:bg-gray-900 ">
        <DashBoardNav user={user}></DashBoardNav>
        <div className="sm:px-4 pt-6 pb-8 flex-grow">
          <Banner ads={ads}></Banner>

          {/* All Assets */}
          <AllAssets user={user}></AllAssets>

          <div className="flex flex-wrap gap-5">
            {/* Your  Portfolio */}
            <YourPortfolio portfolio={portfolio}></YourPortfolio>

            {/* Recent Activity */}
            <RecentActivity exchanges={exchanges}></RecentActivity>
          </div>
        </div>
        <DashBoardFooter></DashBoardFooter>
      </div>
    </>
  );
};

export default DashBoard;
