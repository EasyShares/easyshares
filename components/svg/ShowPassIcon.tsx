import React from "react";

const ShowPassIcon = () => {
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
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.6 14.6a7 7 0 01-10.2 0M12 6v.01M12 6c-1.654 0-3 1.346-3 3v1M12 6v.01M12 6c1.654 0 3 1.346 3 3v1M12 6v.01M"
      />
    </svg>
  );
};

export default ShowPassIcon;
