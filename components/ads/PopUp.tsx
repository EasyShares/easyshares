"use client";
import React, { useState, useEffect } from "react";

const PopUp = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentAdIndex, setCurrentAdIndex] = useState<number>(0);

  // map popup ads here
  const sampleAds: any = [];

  useEffect(() => {
    const showAd = () => {
      setCurrentAdIndex((prevIndex) =>
        prevIndex === sampleAds.length - 1 ? 0 : prevIndex + 1
      );
      setIsOpen(true);
      const hideTimer = setTimeout(() => {
        setIsOpen(false);
      }, 10000); // Hide after 10 seconds
      return () => clearTimeout(hideTimer);
    };

    const interval = setInterval(() => {
      showAd();
    }, 5 * 60 * 1000); // Show ad every 5 minutes

    // Show ad initially
    showAd();

    // Switch ads after 10 seconds
    const switchTimer = setInterval(() => {
      showAd();
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(switchTimer);
    };
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const currentAd = sampleAds[currentAdIndex];

  return (
    <>
      {isOpen && currentAd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 overflow-auto">
          <div className="bg-white p-6 rounded-lg shadow-lg m-5">
            <h3 className="font-bold text-lg text-center mb-4">
              {currentAd.title}
            </h3>
            <p className="text-center mb-4">{currentAd.description}</p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
              >
                Close Ad
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUp;
