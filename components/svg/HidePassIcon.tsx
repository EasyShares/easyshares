import React from "react";

const HidePassIcon = () => {
  return (
    <svg
      className="w-6 h-6 text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15.364 8.636a4 4 0 010 5.657m-.707-.707a4 4 0 000-5.657m.707.707a4 4 0 010 5.657M9 10a2 2 0 100 4 2 2 0 000-4z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.879 14.121A4 4 0 1014.12 9.88M9 10c.805-.805 2.072-.805 2.878 0M15 3a9 9 0 100 18 9 9 0 000-18z"
      />
    </svg>
  );
};

export default HidePassIcon;
