import React from "react";
import DashBoardNav from "@/components/DashBoardNav";
import DashBoardFooter from "@/components/DashBoardFooter";
import { Metadata } from "next";
import ProfileInfo from "@/components/dashboard/ProfileInfo";
import ChangePass from "@/components/dashboard/ChangePass";
import NotificationSet from "@/components/dashboard/NotificationSet";
import TwoFactorAuth from "@/components/dashboard/TwoFactorAuth";
import { DeleteAcc } from "@/components/dashboard/DeleteAcc";
import Deposit from "@/components/dashboard/Deposit";
import Withdraw from "@/components/dashboard/Withdraw";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Account",
  description:
    "Manage your EasyShares account with ease. Update personal information effortlessly.",
};

const Account = async () => {
  const user = await currentUser();
  return (
    <>
      <div className=" bg-gray-50 min-h-screen dark:bg-gray-900">
        <DashBoardNav user={user} />

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 dark:text-white">
            Account Settings
          </h1>

          {/* Deposit */}
          <Deposit></Deposit>

          {/* Withdraw */}
          <Withdraw user={user}></Withdraw>

          {/* Profile Information */}
          <ProfileInfo user={user}></ProfileInfo>

          {/* Change Password */}
          <ChangePass></ChangePass>

          {/* Notification Settings */}
          <NotificationSet user={user}></NotificationSet>

          {/* Two-Factor Authentication */}
          <TwoFactorAuth user={user}></TwoFactorAuth>

          {/* Delete Account */}
          <DeleteAcc user={user}></DeleteAcc>
        </div>

        <DashBoardFooter />
      </div>
    </>
  );
};

export default Account;
