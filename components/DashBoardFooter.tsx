"use client";
import Link from "next/link";
import React from "react";

const DashBoardFooter = () => {
  return (
    <div className="left-0 bottom-0 w-full bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white border-t">
      <div className="container mx-auto px-4">
        <div className="md:flex justify-between items-center text-sm">
          <div className="text-center md:text-left py-3 md:py-4 border-b md:border-b-0">
            <Link
              href="/dashboard"
              className="no-underline text-grey-dark mr-4"
            >
              Home
            </Link>
            <Link href="/terms" className="no-underline text-grey-dark mr-4">
              Terms
            </Link>
            <Link
              href="/privacy-policy"
              className="no-underline text-grey-dark"
            >
              Legal &amp; Privacy
            </Link>
          </div>
          <div className="md:flex md:flex-row-reverse items-center py-4">
            <div className="text-center mb-4 md:mb-0 md:flex">
              <div>
                <Link
                  href="/contact"
                  className="inline-block leading-tight bg-blue border border-blue-dark dark:border-gray-700 hover: bg-blue-500 px-3 py-2 text-white no-underline rounded"
                >
                  Need help?
                </Link>
              </div>
            </div>
            <div className="text-grey text-center md:mr-4">
              &copy; {new Date().getFullYear()} EasyShares
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardFooter;
