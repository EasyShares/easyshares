"use client";
import React, { useEffect, useState } from "react";

const PopularSharesTab = ({ popularBuyShares, popularSellShares }: any) => {
  const [isTabOpen, setIsTabOpen] = useState(true);
  const [popularBoughtShares, setpopularBoughtShares] = useState<any>([]);
  const [popularSoldShares, setpopularSoldShares] = useState<any>([]);

  useEffect(() => {
    const popBuySha = popularBuyShares.slice(0, 3);
    const popSellSha = popularSellShares.slice(0, 3);
    setpopularBoughtShares(popBuySha);
    setpopularSoldShares(popSellSha);
  }, [popularBuyShares, popularSellShares]);

  const closeTab = () => {
    setIsTabOpen(false);
  };

  return (
    <>
      {isTabOpen && (
        <div className="bg-white dark:bg-gray-800 dark:border-gray-700  border-t border-b sm:border-l sm:rounded shadow m-5">
          <div
            onClick={closeTab}
            typeof="button"
            className="bg-white dark:bg-gray-700 dark:border-gray-700 dark:text-white border-b border-l right-5 absolute"
          >
            <div className="p-2 cursor-pointer hover:text-red-500">
              Close Tab
            </div>
          </div>
          <div className="flex flex-col lg:flex-row ml-5 mr-5 mb-5 mt-10">
            <div className="w-full lg:mr-4">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">
                Popular Shares Being Bought
              </h2>
              {popularBoughtShares.length !== 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {popularBoughtShares.map((share: any, index: any) => {
                    let bgColor;
                    if (index === 0) {
                      bgColor = "bg-green-300";
                    } else if (index === 1) {
                      bgColor = "bg-green-200";
                    } else if (index === 2) {
                      bgColor = "bg-green-100";
                    }
                    return (
                      <div
                        key={index + 1}
                        className={`p-4 rounded-lg shadow-lg ${bgColor} flex items-center justify-between flex-wrap`}
                      >
                        <div>
                          <h3 className="text-lg font-semibold">
                            {share.name} SHA
                          </h3>
                          <p className="mt-2">{share.price} KES</p>
                          <p className="mt-2">{share.buyers}% of Buyers</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  className={`p-4 rounded-lg shadow-lg bg-green-200 flex items-center justify-between flex-wrap`}
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      No Data provided yet!
                    </h3>
                  </div>
                </div>
              )}
            </div>
            <div className="w-full lg:ml-4 mt-4 lg:mt-0">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">
                Popular Shares Being Sold
              </h2>
              {popularSoldShares.length !== 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {popularSoldShares.map((share: any, index: any) => {
                    let bgColor;
                    if (index === 0) {
                      bgColor = "bg-red-300";
                    } else if (index === 1) {
                      bgColor = "bg-red-200";
                    } else if (index === 2) {
                      bgColor = "bg-red-100";
                    }
                    return (
                      <div
                        key={index + 1}
                        className={`p-4 rounded-lg shadow-lg ${bgColor} flex items-center justify-between flex-wrap`}
                      >
                        <div>
                          <h3 className="text-lg font-semibold">
                            {share.name} SHA
                          </h3>
                          <p className="mt-2">{share.price} KES</p>
                          <p className="mt-2">{share.sellers}% of Sellers</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  className={`p-4 rounded-lg shadow-lg bg-red-200 flex items-center justify-between flex-wrap`}
                >
                  <div>
                    <h3 className="text-lg font-semibold">
                      No Data provided yet!
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopularSharesTab;
