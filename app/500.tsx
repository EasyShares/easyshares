import React from "react";
import Link from "next/link";

const Custom500 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 dark:text-white">
        <h1 className="text-4xl font-bold mb-4">500 - Server-side error occurred</h1>
        <p className="mb-4">
          Oops! Something went wrong on our end. Please try again later.
        </p>
        <Link href="/">
          <a className="text-blue-500 hover:underline">Go back to Homepage</a>
        </Link>
      </div>
    </div>
  );
};

export default Custom500;
