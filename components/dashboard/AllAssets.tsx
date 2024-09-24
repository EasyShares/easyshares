import React from "react";
import { ExtendedUser } from "@/next-auth";

interface UserInfoProps {
  user?: ExtendedUser;
}

const AllAssets = ({ user }: UserInfoProps) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white border-t border-b sm:border-l sm:border-r sm:rounded shadow mr-5 ml-5 mb-6 lg:mr-0 lg:ml-0">
        <div className="border-b px-6">
          <div className="flex justify-between -mb-px">
            <div className="lg:hidden text-blue-dark py-4 text-lg">
              All Assets
            </div>
            <div className="hidden lg:flex">
              <button
                type="button"
                className="appearance-none py-4 text-blue-dark border-b border-blue-darky"
              >
                All Assets
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between items-center px-6 lg:hidden">
          <div className="flex-grow flex-no-shrink py-6">
            <div className="text-grey-darker mb-2">
              <span className="text-3xl align-top">KES</span>
              <span className="text-5xl">
                {user?.cash_balance.toLocaleString()}
              </span>
              <span className="text-3xl align-top">.00</span>
            </div>
            <div className="text-green-light uppercase text-sm">
              Cash Balance
            </div>
          </div>

          <div className="flex-grow flex-no-shrink py-6">
            <div className="text-grey-darker mb-2">
              <span className="text-3xl align-top">SHA</span>
              <span className="text-5xl">
                {user?.shares_balance.toLocaleString()}
              </span>
              <span className="text-3xl align-top">.00</span>
            </div>
            <div className="text-green-light uppercase text-sm">
              Shares Balance
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <div className="w-1/2 text-center py-8">
            <div className="border-r">
              <div className="text-grey-darker mb-2">
                <span className="text-3xl align-top">KES</span>
                <span className="text-5xl">
                  {user?.cash_balance.toLocaleString()}
                </span>
                <span className="text-3xl align-top">.00</span>
              </div>
              <div className="text-sm uppercase text-grey tracking-wide">
                Cash Balance
              </div>
            </div>
          </div>

          <div className="w-1/2 text-center py-8">
            <div className="text-grey-darker mb-2">
              <span className="text-3xl align-top">SHA</span>
              <span className="text-5xl">
                {user?.shares_balance.toLocaleString()}
              </span>
              <span className="text-3xl align-top">.00</span>
            </div>
            <div className="text-sm uppercase text-grey tracking-wide">
              Shares Balance
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllAssets;
