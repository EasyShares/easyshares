"use client";
import Link from "next/link";
import React, { useState } from "react";

const Competitions = ({ competitions }: any) => {
  const [isTabOpen, setIsTabOpen] = useState<boolean>(true);
  const [compStatus, setCompStatus] = useState<any>("ongoing");

  const closeTab = () => {
    setIsTabOpen(false);
  };

  function getCompetitionsBgColor(status: any) {
    let bgColor;
    if (status === "ongoing") {
      bgColor = "bg-green-500";
    }
    if (status === "completed") {
      bgColor = "bg-red-500";
    }
    if (status === "upcoming") {
      bgColor = "bg-blue-500";
    }
    return bgColor;
  }

  return (
    <>
      {isTabOpen && (
        <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white border-t border-b sm:border-l sm:rounded shadow m-5">
          <div
            onClick={closeTab}
            typeof="button"
            className="bg-white dark:bg-gray-700 dark:border-gray-700 dark:text-white border-b border-l right-5 absolute"
          >
            <div className="p-2 cursor-pointer hover:text-red-500">
              Close Tab
            </div>
          </div>
          <div className="flex flex-col lg:flex-row ml-5 mr-5 mb-5 mt-10">
            <div className="w-full lg:mr-4">
              <h2 className="text-2xl font-bold mb-4">Join Competition</h2>

              <div className="flex flex-wrap mb-5 gap-3">
                <button
                  onClick={() => setCompStatus("completed")}
                  className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Completed
                </button>
                <button
                  onClick={() => setCompStatus("ongoing")}
                  className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-md hover:bg-green-600"
                >
                  Ongoing
                </button>
                <button
                  onClick={() => setCompStatus("upcoming")}
                  className="bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Upcoming
                </button>
              </div>
              {competitions.length !== 0 ? (
                <>
                  <div className="flex flex-wrap gap-4 overflow-x-auto">
                    {competitions
                      .filter(
                        (competition: any) => competition.status === compStatus
                      )
                      .map((competition: any, index: any) => (
                        <Link
                          key={index}
                          href={`/dashboard/competition/${competition.url}`}
                        >
                          <div
                            className={`p-4 rounded-lg shadow-lg ${getCompetitionsBgColor(
                              competition.status
                            )} flex items-center justify-between flex-wrap min-w-48- max-w-64 cursor-pointer dark:text-white`}
                          >
                            <div>
                              <h3 className="text-lg font-semibold">
                                {competition.name}
                              </h3>
                              <p className="mt-2">{competition.status}</p>
                              <p className="mt-2 font-bold">
                                Winner: {competition.winner}
                              </p>
                              <p className="mt-2 font-semibold">
                                {competition.participants} joined
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </>
              ) : (
                <>
                  {" "}
                  <div className="flex flex-wrap gap-4 overflow-x-auto">
                    <div
                      className={`p-4 rounded-lg shadow-lg bg-gray-200 flex items-center justify-between flex-wrap min-w-48- max-w-64 cursor-pointer`}
                    >
                      <div>
                        <h3 className="text-lg font-semibold">
                          No competitions
                        </h3>
                        <p className="mt-2 font-semibold">
                          No competitions at the moment check back later!
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Competitions;
