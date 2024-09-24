"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import CompetitionIcon from "./svg/CompetitionIcon";
import SettingsIcon from "./svg/SettingsIcon";
import TransactionIcon from "./svg/TransactionIcon";
import AccountIcon from "./svg/AccountIcon";
import ExchangeIcon from "./svg/ExchangeIcon";
import DashBoardIcon from "./svg/DashBoardIcon";
import CloseIcon from "./svg/CloseIcon";
import MenuBarIcon from "./svg/MenuBarIcon";
import ArrowDown from "./svg/ArrowDown";
import { logout } from "@/actions/logout";
import { toast, Toaster } from "sonner";
import { usePathname } from "next/navigation";
import { ExtendedUser } from "@/next-auth";
import UsersIcon from "./svg/UsersIcon";

interface UserInfoProps {
  user?: ExtendedUser;
}

const DashBoardNav = ({ user }: UserInfoProps) => {
  const [isOpenDropMenu, setIsOpenDropMenu] = useState(false);
  const [isOpenSideMenu, setIsOpenSideMenu] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = () => {
    setIsOpenDropMenu(!isOpenDropMenu);
  };

  const toggleSideMenu = () => {
    setIsOpenSideMenu(!isOpenSideMenu);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logout successful");
  };

  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <div>
        <div className="bg-blue-500 w-full top-0 shadow-md z-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center md:justify-between py-4">
              <div
                className="w-1/4 md:hidden cursor-pointer"
                onClick={toggleSideMenu}
              >
                {isOpenSideMenu ? <MenuBarIcon /> : <CloseIcon />}
              </div>

              {isOpenSideMenu && (
                <div className="lg:hidden fixed left-0 z-50 overflow-hidden top-16">
                  <div
                    className={`transform transition-all ${
                      isOpenSideMenu ? "translate-x-0" : "-translate-x-full"
                    }`}
                  >
                    <div className="h-screen bg-blue-500 w-80 flex flex-col justify-start items-center py-8">
                      {pathname.includes("/contentmanager") ? (
                        <Link
                          href="/contentmanager"
                          className="flex items-center text-white font-semibold text-lg mb-4 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-100 px-4 py-2 rounded-lg"
                        >
                          <DashBoardIcon />
                          Dashboard
                        </Link>
                      ) : (
                        <Link
                          href="/dashboard"
                          className="flex items-center text-white font-semibold text-lg mb-4 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-100 px-4 py-2 rounded-lg"
                        >
                          <DashBoardIcon />
                          Dashboard
                        </Link>
                      )}
                      <Link
                        href="/dashboard/exchange"
                        className="flex items-center text-white font-semibold text-lg mb-4 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-100 px-4 py-2 rounded-lg"
                      >
                        <ExchangeIcon />
                        Buy/Sell
                      </Link>
                      <Link
                        href="/dashboard/account"
                        className="flex items-center text-white font-semibold text-lg mb-4 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-100 px-4 py-2 rounded-lg"
                      >
                        <AccountIcon />
                        Account
                      </Link>
                      <Link
                        href="/dashboard/transactions"
                        className="flex items-center text-white font-semibold text-lg mb-4 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-100 px-4 py-2 rounded-lg"
                      >
                        <TransactionIcon />
                        Transactions
                      </Link>
                      {user?.role === "ADMIN" ? (
                        <Link
                          href="/contentmanager/settings"
                          className="flex items-center text-white font-semibold text-lg mb-4 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-100 px-4 py-2 rounded-lg"
                        >
                          <SettingsIcon />
                          Settings
                        </Link>
                      ) : (
                        <Link
                          href="/dashboard/settings"
                          className="flex items-center text-white font-semibold text-lg mb-4 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-100 px-4 py-2 rounded-lg"
                        >
                          <SettingsIcon />
                          Settings
                        </Link>
                      )}
                      <Link
                        href="/dashboard/competition"
                        className="flex items-center text-white font-semibold text-lg mb-4 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-100 px-4 py-2 rounded-lg"
                      >
                        <CompetitionIcon />
                        Competition
                      </Link>
                      {user?.role === "ADMIN" && (
                        <Link
                          href="/contentmanager/contact"
                          className="flex items-center text-white font-semibold text-lg mb-4 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 hover:text-gray-100 px-4 py-2 rounded-lg"
                        >
                          <UsersIcon />
                          Support
                        </Link>
                      )}
                      <p className="text-gray-200 mx-4 top-3/4 absolute">
                        &copy; {new Date().getFullYear()} EasyShares. All rights
                        reserved.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="w-1/2 md:w-auto text-center text-white text-2xl font-medium">
                {pathname.includes("/contentmanager") ? (
                  <>
                    <Link
                      className="text-3xl font-bold leading-none"
                      href="/contentmanager"
                    >
                      <Image
                        width={200}
                        height={120}
                        src="/img/logo-3.png"
                        alt="Logo"
                        className="rounded-lg"
                      />
                    </Link>
                  </>
                ) : (
                  <>
                    {" "}
                    <Link
                      className="text-3xl font-bold leading-none"
                      href="/dashboard"
                    >
                      <Image
                        width={200}
                        height={120}
                        src="/img/logo-3.png"
                        alt="Logo"
                        className="rounded-lg"
                      />
                    </Link>
                  </>
                )}
              </div>

              <div
                className="w-1/4 md:w-auto md:flex text-right cursor-pointer"
                onClick={toggleDropdown}
              >
                <div>
                  <Image
                    width={32}
                    height={32}
                    className="inline-block h-8 w-8 rounded-full bg-blue-500 shadow-lg"
                    src="/img/avatar-3.webp"
                    alt="Avatar"
                    title={user?.fullname}
                  />
                </div>
                <div
                  className="hidden md:flex md:items-center ml-2"
                  onClick={toggleDropdown}
                >
                  <span className="text-white text-sm mr-1">
                    {user?.fullname}
                  </span>
                  <div>
                    <ArrowDown />
                  </div>
                </div>

                <div className="relative">
                  {isOpenDropMenu && (
                    <div className="fixed top-16 mt-2 right-1 w-64 bg-white dark:border-2 dark:bg-gray-900 dark:border-gray-400 dark:text-white rounded-md shadow-lg z-10 transition duration-300 ease-in-out transform origin-top">
                      <div className="py-1">
                        <div className="flex justify-between items-center px-4 h-8">
                          <div className="text-gray-700 dark:text-white text-x font-bold">
                            You&apos;re signed in as:
                          </div>
                        </div>
                        <div className="flex justify-between items-center px-4 h-8">
                          <div className="text-gray-700 dark:text-white text-sm truncate">
                            {user?.email}
                          </div>
                        </div>
                        <hr className="border-gray-200" />
                        <Link href={"/dashboard/account"}>
                          <div className="flex justify-between items-center px-4 h-10">
                            <div className="text-gray-700 dark:text-white  text-sm truncate hover:text-blue-500">
                              Deposit
                            </div>
                          </div>
                        </Link>
                        <hr className="border-gray-200" />
                        <Link href={"/dashboard/account"}>
                          <div className="flex justify-between items-center px-4 h-10">
                            <div className="text-gray-700 dark:text-white text-sm truncate hover:text-blue-500">
                              Withdraw
                            </div>
                          </div>
                        </Link>
                        <hr className="border-gray-200" />
                        <Link href={"/dashboard/affiliates"}>
                          <div className="flex justify-between items-center px-4 h-10">
                            <div className="text-gray-700 dark:text-white text-sm truncate hover:text-blue-500">
                              Affiliates
                            </div>
                          </div>
                        </Link>
                        <hr className="border-gray-200" />
                        {user?.role === "ADMIN" && (
                          <>
                            {pathname.includes("/contentmanager") ? (
                              <>
                                <Link href={"/dashboard"}>
                                  <div className="flex justify-between items-center px-4 h-10">
                                    <div className="text-gray-700 dark:text-white text-sm truncate hover:text-blue-500">
                                      Dashboard
                                    </div>
                                  </div>
                                </Link>
                              </>
                            ) : (
                              <>
                                {" "}
                                <Link href={"/contentmanager"}>
                                  <div className="flex justify-between items-center px-4 h-10">
                                    <div className="text-gray-700 dark:text-white text-sm truncate hover:text-blue-500">
                                      Content Mananger
                                    </div>
                                  </div>
                                </Link>
                              </>
                            )}
                          </>
                        )}

                        <hr className="border-gray-200" />
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-x font-semibold text-gray-700 dark:hover:bg-gray-800 dark:text-white hover:bg-gray-100 hover:text-blue-500 transition duration-300 ease-in-out"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden  bg-blue-500 md:block md:bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white md:border-b">
          <div className="container mx-auto px-4">
            <div className="md:flex">
              <div className="flex -mb-px mr-8 cursor-pointer">
                {pathname.includes("/contentmanager") ? (
                  <>
                    {" "}
                    <Link
                      href="/contentmanager"
                      className={`no-underline text-white md:text-blue-500 flex items-center py-4 border-b ${
                        pathname === "/contentmanager"
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                    >
                      <DashBoardIcon />
                      Dashboard
                    </Link>
                  </>
                ) : (
                  <>
                    {" "}
                    <Link
                      href="/dashboard"
                      className={`no-underline text-white md:text-blue-500 flex items-center py-4 border-b ${
                        pathname === "/dashboard"
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                    >
                      <DashBoardIcon />
                      Dashboard
                    </Link>
                  </>
                )}
              </div>
              <div className="flex -mb-px mr-8 cursor-pointer">
                <Link
                  href="/dashboard/exchange"
                  className={`no-underline text-white md:text-blue-500 flex items-center py-4 border-b ${
                    pathname === "/dashboard/exchange"
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <ExchangeIcon />
                  Buy/Sell
                </Link>
              </div>
              <div className="flex -mb-px mr-8 cursor-pointer">
                <Link
                  href="/dashboard/account"
                  className={`no-underline text-white md:text-blue-500 flex items-center py-4 border-b ${
                    pathname === "/dashboard/account"
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <AccountIcon />
                  Account
                </Link>
              </div>
              <div className="flex -mb-px mr-8 cursor-pointer">
                <Link
                  href="/dashboard/transactions"
                  className={`no-underline text-white md:text-blue-500 flex items-center py-4 border-b ${
                    pathname === "/dashboard/transactions"
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <TransactionIcon />
                  Transactions
                </Link>
              </div>
              {user?.role === "ADMIN" ? (
                <div className="flex -mb-px mr-8 cursor-pointer">
                  <Link
                    href="/contentmanager/settings"
                    className={`no-underline text-white md:text-blue-500 flex items-center py-4 border-b ${
                      pathname === "/dashboard/settings"
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <SettingsIcon />
                    Settings
                  </Link>
                </div>
              ) : (
                <div className="flex -mb-px mr-8 cursor-pointer">
                  <Link
                    href="/dashboard/settings"
                    className={`no-underline text-white md:text-blue-500 flex items-center py-4 border-b ${
                      pathname === "/dashboard/settings"
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                  >
                    <SettingsIcon />
                    Settings
                  </Link>
                </div>
              )}

              <div className="flex -mb-px mr-8 cursor-pointer">
                <Link
                  href="/dashboard/competition"
                  className={`no-underline text-white md:text-blue-500 flex items-center py-4 border-b ${
                    pathname === "/dashboard/competition"
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <CompetitionIcon />
                  Competition
                </Link>
              </div>

              {user?.role === "ADMIN" && (
                <>
                  <div className="flex -mb-px cursor-pointer">
                    <Link
                      href="/contentmanager/contact"
                      className={`no-underline text-white md:text-blue-500 flex items-center py-4 border-b ${
                        pathname === "/contentmanager/contact"
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                    >
                      <UsersIcon />
                      Contacts
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardNav;
