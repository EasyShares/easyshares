"use client";
import React from "react";

const ViewLicenceButton = () => {
  const viewLicensePDF = () => {
    if (typeof window !== "undefined") {
      window.open("/your-license-file.pdf", "_blank");
    }
  };
  return (
    <div className="mt-8">
      <button
        onClick={viewLicensePDF}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        View License PDF
      </button>
    </div>
  );
};

export default ViewLicenceButton;
