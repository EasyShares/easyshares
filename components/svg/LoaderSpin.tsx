import React from "react";

const LoaderSpin = () => {
  return (
    <svg
      className="w-12 h-12 text-gray-700 dark:text-gray-300 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V2.83a1 1 0 011.7-.71l6 6a1 1 0 010 1.42l-6 6a1 1 0 01-1.7-.71V12a4 4 0 10-4 4h8.17a1 1 0 01.7 1.7l-6 6a1 1 0 01-1.42 0l-6-6A1 1 0 014 15.17V12z"
      ></path>
    </svg>
  );
};

export default LoaderSpin;
