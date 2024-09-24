"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Assets = ({ buyOrders, sellOrders, assets, cashassets }: any) => {
  const [totalBuyOrders, setTotalBuyOrders] = useState<any>(0);
  const [totalSellOrders, setTotalSellOrders] = useState<any>(0);
  const [totalSharesBought, setTotalSharesBought] = useState<any>(0);
  const [totalSharesSold, setTotalSharesSold] = useState<any>(0);
  const [totalDepositsMade, setTotalDepositsMade] = useState<any>(0);
  const [totalWithdrawalsMade, setTotalWithdrawalsMade] = useState<any>(0);
  const [totalProfitMade, setTotalProfitMade] = useState<any>(0);
  const [buyOrdersPercentage, setbuyOrdersPercentage] = useState<any>(100);
  const [sellOrdersPercentage, setsellOrdersPercentage] = useState<any>(100);
  const [depositPercentage, setdepositPercentage] = useState<any>(100);
  const [WithdrawalPercentage, setWithdrawalPercentage] = useState<any>(100);
  const [sharesboughtPercentage, setsharesboughtPercentage] =
    useState<any>(100);
  const [sharessoldPercentage, setsharessoldPercentage] = useState<any>(100);
  const [profitPercentage, setprofitPercentage] = useState<any>(100);

  useEffect(() => {
    function calculateAssetsStats() {
      if (buyOrders.length !== 0 || sellOrders.length !== 0) {
        const total_buyOrders = buyOrders.length;
        setTotalBuyOrders(total_buyOrders);

        const total_sellOrders = sellOrders.length;
        setTotalSellOrders(total_sellOrders);

        const buyOrders_percentage =
          (total_buyOrders / (total_buyOrders + total_sellOrders)) * 100;
        const sellOrders_percentage =
          (total_sellOrders / (total_buyOrders + total_sellOrders)) * 100;
        setbuyOrdersPercentage(buyOrders_percentage);
        setsellOrdersPercentage(sellOrders_percentage);
      }

      const totalSharesBought = assets.reduce((total: any, asset: any) => {
        if (asset.type === "buy") {
          return total + asset.amount;
        }
        return total;
      }, 0);
      setTotalSharesBought(totalSharesBought);
      const totalSharesSold = assets.reduce((total: any, asset: any) => {
        if (asset.type === "sell") {
          return total + asset.amount;
        }
        return total;
      }, 0);
      setTotalSharesSold(totalSharesSold);
      const totalDeposits = cashassets.reduce((total: any, asset: any) => {
        if (asset.type === "Deposit") {
          return total + Math.floor(asset.amount);
        }
        return total;
      }, 0);
      setTotalDepositsMade(totalDeposits);
      const totalWithdrawals = cashassets.reduce((total: any, asset: any) => {
        if (asset.type === "Withdrawal") {
          return total + Math.floor(asset.amount);
        }
        return total;
      }, 0);
      setTotalWithdrawalsMade(totalWithdrawals);
      const totalProfit = assets.reduce((total: any, asset: any) => {
        if (asset.type === "sell") {
          if (asset.status === "sold")
            return Math.floor((totalSharesSold / 2) * (5 / 100));
        }
        return total;
      }, 0);
      setTotalProfitMade(totalProfit);

      setdepositPercentage(
        (totalDeposits / (totalDeposits + totalWithdrawals)) * 100
      );
      setWithdrawalPercentage(
        (totalWithdrawals / (totalDeposits + totalWithdrawals)) * 100
      );
      setsharesboughtPercentage(
        (totalSharesBought / (totalSharesBought + totalSharesSold)) * 100
      );
      setsharessoldPercentage(
        (totalSharesSold / (totalSharesBought + totalSharesSold)) * 100
      );
      setprofitPercentage((totalProfit / totalSharesSold) * 100);
    }
    calculateAssetsStats();
  });
  const AllAssets = [
    {
      name: "Total Deposits",
      price: `KES ${totalDepositsMade}`,
      bgColor: "bg-green-200",
      percentage: depositPercentage,
    },
    {
      name: "Total Withdrawals",
      price: `KES ${totalWithdrawalsMade}`,
      bgColor: "bg-red-200",
      percentage: WithdrawalPercentage,
    },
    {
      name: "Profit Made",
      price: `KES ${totalProfitMade}`,
      bgColor: "bg-green-300",
      percentage: profitPercentage,
    },
    {
      name: "Loss Made",
      price: "KES 0",
      bgColor: "bg-red-300",
      percentage: 0,
    },
    {
      name: "Total Shares Bought",
      price: `SHA ${totalSharesBought}`,
      bgColor: "bg-purple-200",
      percentage: sharesboughtPercentage,
    },
    {
      name: "Total Shares Sold",
      price: `SHA ${totalSharesSold}`,
      bgColor: "bg-indigo-200",
      percentage: sharessoldPercentage,
    },
    {
      name: "Total Buy Orders",
      price: totalBuyOrders,
      bgColor: "bg-blue-300",
      percentage: buyOrdersPercentage,
    },
    {
      name: "Total Sell Orders",
      price: totalSellOrders,
      bgColor: "bg-red-300",
      percentage: sellOrdersPercentage,
    },
  ];
  return (
    <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Assets Statistics
      </h2>
      <Link href="/contentmanager/manage-assets">
        <button className="mt-3 mb-3 bg-green-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-green-600">
          Manage Asssets
        </button>
      </Link>

      <div className="w-full lg:mr-4">
        <div className="flex flex-wrap gap-4">
          {AllAssets.map((share, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-lg ${share.bgColor} flex items-center justify-between flex-wrap max-h-64 min-w-64`}
            >
              <div>
                <h3 className="text-lg font-semibold">{share.name}</h3>
                <p className="mt-2 font-semibold">{share.price}</p>
                <p className="mt-2 font-semibold">
                  {Math.round(share.percentage)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assets;
