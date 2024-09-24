"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";

const Nav = () => {
  useEffect(() => {
    const handleBurgerClick = () => {
      const menus = document.querySelectorAll(".navbar-menu");
      menus.forEach((menu) => {
        menu.classList.toggle("hidden");
      });
    };

    const handleMenuClose = () => {
      const menus = document.querySelectorAll(".navbar-menu");
      menus.forEach((menu) => {
        menu.classList.add("hidden");
      });
    };

    const burgerButtons = document.querySelectorAll(".navbar-burger");
    burgerButtons.forEach((button) => {
      button.addEventListener("click", handleBurgerClick);
    });

    const closeButton = document.querySelectorAll(".navbar-close");
    closeButton.forEach((button) => {
      button.addEventListener("click", handleMenuClose);
    });

    const backdrop = document.querySelectorAll(".navbar-backdrop");
    backdrop.forEach((element) => {
      element.addEventListener("click", handleMenuClose);
    });

    return () => {
      burgerButtons.forEach((button) => {
        button.removeEventListener("click", handleBurgerClick);
      });

      closeButton.forEach((button) => {
        button.removeEventListener("click", handleMenuClose);
      });

      backdrop.forEach((element) => {
        element.removeEventListener("click", handleMenuClose);
      });
    };
  }, []);

  return (
    <div>
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white shadow-md">
        <Link className="text-3xl font-bold leading-none" href="/">
          <Image
            width={200}
            height={120}
            src="/img/logo.png"
            alt="Logo"
            className="rounded-lg"
          />
        </Link>

        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                passHref
                className="text-sm font-bold text-gray-700 hover:text-blue-500"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                passHref
                className="text-sm font-bold text-gray-700 hover:text-blue-500"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                passHref
                className="text-sm font-bold text-gray-700 hover:text-blue-500"
              >
                Contact
              </Link>
            </li>
          </ul>
          <Link
            href="/auth/login"
            passHref
            className="py-2 px-6 bg-gray-100 hover:bg-gray-300 text-sm text-gray-900 font-bold rounded-xl transition duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            passHref
            className="py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-xl transition duration-200"
          >
            Sign Up
          </Link>
        </div>

        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-blue-600 p-3">
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
      </nav>

      <div className="navbar-menu relative z-50 hidden">
        <div className="navbar-backdrop fixed inset-0 bg-white-800 opacity-25"></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 z-50 border-r overflow-y-auto bg-gradient-to-r from-blue-500 to-indigo-500">
          <div className="flex items-center mb-8">
            <Link className="mr-auto text-3xl font-bold leading-none" href="/">
              <Image
                width={200}
                height={120}
                src="/img/logo.png"
                alt="Hero Image"
                className="rounded-lg"
              />
            </Link>
            <button className="navbar-close">
              <svg
                className="font-bold h-6 w-6 text-white-400 cursor-pointer hover:text-white-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-white-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-white-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="about"
                >
                  About Us
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-white-400 hover:bg-blue-50 hover:text-blue-600 rounded"
                  href="contact"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              <Link
                className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold bg-gray-50 hover:bg-gray-100 rounded-xl"
                href="auth/login"
              >
                Sign in
              </Link>
              <Link
                className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"
                href="auth/register"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
