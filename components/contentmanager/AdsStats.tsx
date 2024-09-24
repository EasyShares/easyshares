"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Ads = ({ ads }: any) => {
  const [totalads, setTotalads] = useState<any>(0);
  const [totalactiveads, setTotalactiveads] = useState<any>(0);
  const [totalinactiveads, setTotalinactiveads] = useState<any>(0);
  const [totaladsrevenue, setTotaladsrevenue] = useState<any>(0);
  useEffect(() => {
    function calculateAdsStats() {
      if (ads.length !== 0) {
        const allads = ads.length;
        setTotalads(allads);
        const activeads = ads.filter((ad: any) => ad.status === "active");
        setTotalactiveads(activeads.length);
        const inactiveads = ads.filter((ad: any) => ad.status === "inactive");
        setTotalinactiveads(inactiveads.length);
      }
    }
    calculateAdsStats();
  });
  const AllAds = [
    {
      name: "Total Ads",
      price: totalads,
      bgColor: "bg-blue-200",
    },
    {
      name: "Total Ads Revenue",
      price: `KES ${totaladsrevenue}`,
      bgColor: "bg-yellow-400",
    },
    {
      name: "Active Ads",
      price: totalactiveads,
      bgColor: "bg-green-300",
    },
    {
      name: "Inactive Ads",
      price: totalinactiveads,
      bgColor: "bg-red-300",
    },
  ];
  return (
    <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Ads Statistics
      </h2>
      <Link href="/contentmanager/manage-ads">
        <button className="mt-3 mb-3 bg-yellow-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-yellow-600">
          Manage Ads
        </button>
      </Link>
      <div className="w-full lg:mr-4">
        <div className="flex flex-wrap gap-4">
          {AllAds.map((share, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-lg ${share.bgColor} flex items-center justify-between flex-wrap max-h-64 min-w-64`}
            >
              <div>
                <h3 className="text-lg font-semibold">{share.name}</h3>
                <p className="mt-2 font-semibold">{share.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ads;
