"use client";
import React from "react";
import Link from "next/link";
import { format } from "date-fns";

const RecentActivity = ({ exchanges }: any) => {
  const recentActivity = exchanges.slice(-5);

  return (
    <div className="w-full lg:w-2/5 min-h-60">
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white border-t border-b sm:rounded sm:border shadow mr-5 ml-5 lg:mr-0 lg:ml-0">
        <div className="border-b">
          <div className="flex justify-between px-6 -mb-px">
            <h3 className="text-blue-dark py-4 font-normal text-lg">
              Recent Activity
            </h3>
          </div>
        </div>
        <div>
          {recentActivity.length !== 0 ? (
            <div className="overflow-y-auto">
              {recentActivity
                .filter(
                  (activity: any) =>
                    activity.status === "sold" || activity.status === "bought"
                )
                .reverse()  // Reversing the order so that the latest activities come first
                .map((activity: any, index: any) => (
                  <div
                    key={activity.id}
                    className={`px-6 py-4 border-t ${index !== 0 ? "border-b" : ""}`}
                  >
                    <p className="text-gray-700 dark:text-white">
                      {`You ${activity.status} ${activity.amount
                        } Shares on ${format(new Date(activity.createdAt), "MM/dd/yyyy ")} at ${format(new Date(activity.createdAt), "p")}`}
                    </p>
                  </div>
                ))}

              <div className="m-5 flex flex-row">
                <p className="text-grey max-w-xs mx-auto mb-6 mr-3">
                  Start buying and selling shares at a customized ROI of 50%.
                </p>
                <Link href={"/dashboard/exchange"}>
                  <button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-600 text-white border border-blue-dark rounded px-6 py-4"
                  >
                    Buy now
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center px-6 py-4">
              <div className="py-8">
                <div className="mb-4">
                  <svg
                    className="inline-block fill-current text-grey h-16 w-16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M11.933 13.069s7.059-5.094 6.276-10.924a.465.465 0 0 0-.112-.268.436.436 0 0 0-.263-.115C12.137.961 7.16 8.184 7.16 8.184c-4.318-.517-4.004.344-5.974 5.076-.377.902.234 1.213.904.959l2.148-.811 2.59 2.648-.793 2.199c-.248.686.055 1.311.938.926 4.624-2.016 5.466-1.694 4.96-6.112zm1.009-5.916a1.594 1.594 0 0 1 0-2.217 1.509 1.509 0 0 1 2.166 0 1.594 1.594 0 0 1 0 2.217 1.509 1.509 0 0 1-2.166 0z" />
                  </svg>
                </div>
                <p className="text-2xl text-grey-darker font-medium mb-4">
                  No buys or sells yet
                </p>
                <p className="text-grey max-w-xs mx-auto mb-6">
                  Start buying and selling shares at a customized ROI of 50%.
                </p>
                <div>
                  <Link href={"/dashboard/exchange"}>
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white border border-blue-dark rounded px-6 py-4"
                    >
                      Buy now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
