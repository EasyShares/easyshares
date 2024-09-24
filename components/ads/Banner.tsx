"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Banner = ({ ads }: any) => {
  const [isTabOpen, setIsTabOpen] = useState(true);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [adTimer, setAdTimer] = useState<NodeJS.Timeout>();

  const closeTab = () => {
    setIsTabOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentAdIndex((prevIndex) =>
        prevIndex === ads.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    setAdTimer(timer);

    return () => {
      clearTimeout(adTimer);
    };
  }, [currentAdIndex]);

  const currentAd = ads[currentAdIndex];

  return (
    <>
      {isTabOpen && currentAd && currentAd.status === "active" && (
        <div className="flex flex-wrap bg-blue-200 border-blue-200 border-t border-b sm:border-l sm:border-r sm:rounded shadow mr-5 ml-5 mb-6 lg:mr-0 lg:ml-0">
          <div
            onClick={closeTab}
            typeof="button"
            className="bg-white border-b border-l right-5 absolute"
          >
            <div className="p-2 cursor-pointer hover:text-red-500">
              Close Ad
            </div>
          </div>
          {currentAd.url !== "" ? (
            <>
              <Link href={currentAd.url}>
                <div className="p-5 mt-5 lg:mt-0 cursor-pointer">
                  {currentAd.type === "banner" && (
                    <>
                      <div className="text-xl flex flex-row">
                        {currentAd.name}
                      </div>
                      <div className="text-x">{currentAd.description}</div>
                    </>
                  )}
                  {currentAd.code && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: currentAd.code,
                      }}
                    />
                  )}
                </div>
              </Link>
            </>
          ) : (
            <>
              <div className="p-5 mt-5 lg:mt-0 cursor-pointer">
                {currentAd.type === "banner" && (
                  <>
                    <div className="text-xl flex flex-row">
                      {currentAd.name}
                    </div>
                    <div className="text-x">{currentAd.description}</div>
                  </>
                )}
                {currentAd.code && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: currentAd.code,
                    }}
                  />
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Banner;
