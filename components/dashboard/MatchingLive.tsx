"use client";
import useExchanges from "@/hooks/useExchanges";
import React, { useState } from "react";

const MatchingLive = () => {
  const { exchanges, onlineusers } = useExchanges();
  const [isTabOpen, setIsTabOpen] = useState(true);

  const closeTab = () => {
    setIsTabOpen(false);
  };
  return (
    <>
      {isTabOpen && (
        <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white border-t border-b sm:border-l sm:rounded shadow m-5 relative min-h-64 max-h-96">
          <div
            onClick={closeTab}
            typeof="button"
            className="bg-white dark:bg-gray-700 dark:border-gray-700 dark:text-white border-b border-l absolute top-0 right-0 p-2 cursor-pointer hover:text-red-500"
          >
            Close Tab
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <div className="w-full lg:w-1/2 text-center py-8">
              <div className="">
                <div className="text-grey-darker mb-2">
                  <span className="text-5xl animate-price-color">
                    {onlineusers[0]?.users}
                  </span>
                </div>
                <div className="text-sm uppercase text-grey tracking-wide">
                  ONLINE USERS
                </div>
              </div>
            </div>
          </div>
          {exchanges.length !== 0 ? (
            <div className="overflow-y-auto h-60 flex flex-col items-center">
              {exchanges
                .filter(
                  (order: any) =>
                    order.status === "sold" || order.status === "bought"
                )
                .map((order: any, index: any) => (
                  <div
                    key={order.id}
                    className={`shadow-lg p-3 text-sm ${
                      order.status === "bought"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.name} {order.status} {order.amount} shares : Match ID{" "}
                    {order.matchID}
                  </div>
                ))}
            </div>
          ) : (
            <div className="h-64 overflow-hidden flex flex-col items-center justify-center font-bold text-green-500">
              No Exchange activity yet
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MatchingLive;
