"use client";
import React, { useState } from "react";

const CompetitionsMoreInfo = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const showModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div className="mt-6">
        <button
          onClick={showModal}
          className="bg-blue-500 text-white dark:text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-600"
        >
          More Information
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50 overflow-auto">
          <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white p-6 rounded-lg shadow-lg m-5">
            <h3 className="font-bold text-lg text-center mb-4">
              How Refferal Monthly Competition works and Rules to participate ?
              <p className="text-sm  mt-2">
                Participate in the refferal competition every month where the
                person with the highest number of refferals per month is the
                winner of the competition. The competition starts every start
                (1st) of the month and ends at the end of month. After the
                competition ends all awards will be send to all winners. Winners
                from Position 1 to 100 are awarded. Below is the award pool for
                all winners.
              </p>
              <p className="font-bold mt-5">
                Awards Pool from 1st to 100th Position
              </p>
              <div className="flex flex-col lg:border-2 gap-3 lg:gap-0">
                <div className="w-full flex flex-row items-center justify-center lg:border-b-2">
                  <p className="w-1/2 text-sm lg:border-r-2">Position</p>
                  <p className="w-1/2 text-sm">Prize</p>
                </div>
                <div className="w-full flex flex-row  items-center justify-center lg:border-b-2">
                  <p className="w-1/2 text-sm lg:border-r-2">1st</p>
                  <p className="w-1/2 text-sm">100,000 Shares</p>
                </div>
                <div className="w-full flex flex-row  items-center justify-center lg:border-b-2">
                  <p className="w-1/2 text-sm lg:border-r-2">2nd</p>
                  <p className="w-1/2 text-sm">50,000 Shares</p>
                </div>
                <div className="w-full flex flex-row  items-center justify-center lg:border-b-2">
                  <p className="w-1/2 text-sm lg:border-r-2">3rd</p>
                  <p className="w-1/2 text-sm">20,000 Shares</p>
                </div>
                <div className="w-full flex flex-row  items-center justify-center lg:border-b-2">
                  <p className="w-1/2 text-sm lg:border-r-2">4th to 10th</p>
                  <p className="w-1/2 text-sm">5000 Shares</p>
                </div>
                <div className="w-full flex flex-row  items-center justify-center">
                  <p className="w-1/2 text-sm lg:border-r-2">11th to 100th</p>
                  <p className="w-1/2 text-sm">1000 Shares</p>
                </div>
              </div>
              <p className="mt-5 text-sm">
                <span className="text-red-500">NOTE:</span> For a refferal to be
                valid their email has to be verified.
              </p>
            </h3>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompetitionsMoreInfo;
