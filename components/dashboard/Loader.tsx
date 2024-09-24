import React from "react";

const Loader = () => {
  return (
    <div className="text-2xl font-bold flex flex-row items-center justify-center gap-5 dark:bg-gray-800 dark:text-white">
      <div className="text-center">Dashboard Loading</div>
      <div className="dot-windmill"></div>
    </div>
  );
};

export default Loader;
