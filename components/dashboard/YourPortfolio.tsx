"use client";
import React from "react";
import Link from "next/link";

const YourPortfolio = ({ portfolio }: any) => {
  return (
    <>
      <div className="w-full lg:mb-0 lg:w-1/2 flex flex-col mr-5 ml-5 lg:mr-0 lg:ml-0">
        <div className="flex-grow flex flex-col dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white border-t border-b sm:rounded sm:border shadow overflow-hidden">
          <div className="border-b">
            <div className="flex justify-between px-6 -mb-px">
              <h3 className="text-blue-dark py-4 font-normal text-lg">
                Your Portfolio
              </h3>
              <div className="flex items-center">
                <button
                  type="button"
                  className="font-normal text-lg appearance-none py-4 text-grey-dark border-b border-transparent hover:border-grey-dark"
                >
                  Amount
                </button>
              </div>
            </div>
          </div>
          {!portfolio ? (
            <>
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
                    No activity in your account yet
                  </p>
                  <p className="text-grey max-w-xs mx-auto mb-6">
                    Start by depositing funds in your account!
                  </p>
                  <div>
                    <Link href={"/dashboard/account"}>
                      <button
                        type="button"
                        className="bg-blue-500 hover:bg-blue-600 text-white border border-blue-dark rounded px-6 py-4"
                      >
                        Deposit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex-grow flex px-6 py-6 text-grey-darker items-center border-b -mx-4">
                <div className="w-1/2 xl:w-1/2 px-4 flex items-center">
                  <div className="rounded-full bg-orange inline-flex mr-3 lg:mr-0"></div>
                  <span className="text-lg">Shares Bought</span>
                </div>
                <div className="flex w-1/2 md:w-1/2 justify-end -ml-5">
                  <div className="w-1/2 px-4 mr-3 lg:mr-0">
                    <div className="text-right text-grey">
                      {portfolio.total_shares_bought.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-grow flex px-6 py-6 text-grey-darker items-center border-b -mx-4">
                <div className="w-1/2 xl:w-1/2 px-4 flex items-center">
                  <div className="rounded-full bg-grey inline-flex mr-3 lg:mr-0"></div>
                  <span className="text-lg">Shares Sold</span>
                </div>
                <div className="flex w-1/2 md:w-1/2 justify-end -ml-5">
                  <div className="w-1/2 px-4 mr-3 lg:mr-0">
                    <div className="text-right text-grey">
                      {portfolio.total_shares_sold.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-grow flex px-6 py-6 text-grey-darker items-center border-b -mx-4">
                <div className="w-1/2 xl:w-1/2 px-4 flex items-center">
                  <div className="rounded-full bg-indigo inline-flex mr-3 lg:mr-0"></div>
                  <span className="text-lg">Deposits</span>
                </div>
                <div className="flex w-1/2 md:w-1/2 justify-end -ml-5">
                  <div className="w-1/2 px-4 mr-3 lg:mr-0">
                    <div className="text-right text-grey">
                      {portfolio.total_deposits.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-grow flex px-6 py-6 text-grey-darker items-center border-b -mx-4">
                <div className="w-1/2 xl:w-1/2 px-4 flex items-center">
                  <div className="rounded-full bg-indigo inline-flex mr-3 lg:mr-0"></div>
                  <span className="text-lg">Withdrawals</span>
                </div>
                <div className="flex w-1/2 md:w-1/2 justify-end -ml-5">
                  <div className="w-1/2 px-4 mr-3 lg:mr-0">
                    <div className="text-right text-grey">
                      {portfolio.total_withdrawals.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-grow flex px-6 py-6 text-grey-darker items-center border-b -mx-4">
                <div className="w-1/2 xl:w-1/2 px-4 flex items-center">
                  <div className="rounded-full bg-indigo inline-flex mr-3 lg:mr-0"></div>
                  <span className="text-lg">Refferals</span>
                </div>
                <div className="flex w-1/2 md:w-1/2 justify-end -ml-5">
                  <div className="w-1/2 px-4 mr-3 lg:mr-0">
                    <div className="text-right text-grey">
                      {portfolio.total_affiliates_profit.toLocaleString(
                        "en-US",
                        {
                          minimumFractionDigits: 2,
                        }
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="text-center text-grey">
                  Total Profit &asymp; KES{" "}
                  {portfolio.total_profit.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default YourPortfolio;
