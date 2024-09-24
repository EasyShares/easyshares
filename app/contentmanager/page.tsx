import React from "react";
import { RoleGate } from "@/components/auth/RoleGate";
import Ads from "@/components/contentmanager/AdsStats";
import Assets from "@/components/contentmanager/AssetsStats";
import Users from "@/components/contentmanager/UsersStats";
import DashBoardFooter from "@/components/DashBoardFooter";
import DashBoardNav from "@/components/DashBoardNav";
import {
  getAllAdmins,
  getAllAds,
  getAllBuyOders,
  getAllCashAssets,
  getAllExchangeAssets,
  getAllSellOders,
  getAllUsers,
} from "@/data/content-manager";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";

const Home: React.FC = async () => {
  const user = await currentUser();
  const users = await getAllUsers();
  const admins = await getAllAdmins();
  const cashassets = await getAllCashAssets();
  const exchangeassets = await getAllExchangeAssets();
  const buyOrders = await getAllBuyOders();
  const sellOrders = await getAllSellOders();
  const ads = await getAllAds();
  return (
    <>
      <RoleGate user={user} allowedRole={UserRole.ADMIN}>
        <div className="flex flex-col  bg-gray-100 dark:bg-gray-900 min-h-screen">
          <DashBoardNav user={user}></DashBoardNav>
          <div className="container mx-auto px-4 py-8 flex-grow">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
              Content Manager
            </h1>
            <Assets
              buyOrders={buyOrders}
              sellOrders={sellOrders}
              assets={exchangeassets}
              cashassets={cashassets}
            ></Assets>
            <Users admins={admins} users={users}></Users>
            <Ads ads={ads}></Ads>
          </div>
          <DashBoardFooter />
        </div>
      </RoleGate>
    </>
  );
};

export default Home;
