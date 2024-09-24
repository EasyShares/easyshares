"use client";
import { BuyShares, SellShares } from "@/actions/exchange";
import React, { useState, useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";

type Props = {
  price_id: any;
};

type IDKey = keyof Props;

const BuySellShares = ({ sellPrices, buyPrices }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTabOpen, setIsTabOpen] = useState(true);
  const [selectedID, setSelectedId] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isloading, setisLoding] = useState<boolean>(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeTab = () => {
    setIsTabOpen(false);
  };

  const handleBuy = (price_id: any) => {
    setIsOpen(true);
    setSelectedId(price_id);
    setSelectedType("buy");
  };

  const handleSell = (price_id: any) => {
    setIsOpen(true);
    setSelectedId(price_id);
    setSelectedType("sell");
  };

  const handleSendOrder = () => {
    setisLoding(true);
    const formData = {
      amount: selectedID,
      ordertype: selectedType,
    };
    if (selectedType === "buy") {
      startTransition(() => {
        BuyShares(formData)
          .then((data: any) => {
            const success = data.success;
            const message = data.message;
            if (success) {
              if (data.info) {
                toast.success(`${message}`, {
                  duration: 10000,
                  description: data.info,
                });
              }
            } else {
              toast.error(`${message}`);
            }
            setisLoding(false);
            setSelectedId(0);
            setSelectedType("");
            setIsOpen(false);
          })
          .catch((error) => {
            setisLoding(false);
            toast.error("An error occured, try again!");
          });
      });
    }
    if (selectedType === "sell") {
      startTransition(() => {
        SellShares(formData)
          .then((data: any) => {
            const success = data.success;
            const message = data.message;
            if (success) {
              if (data.info) {
                toast.success(`${message}`, {
                  duration: 10000,
                  description: data.info,
                });
              }
            } else {
              toast.error(`${message}`);
            }
            setisLoding(false);
            setSelectedId(0);
            setSelectedType("");
            setIsOpen(false);
          })
          .catch((error) => {
            setisLoding(false);
            toast.error("An error occured, try again!");
          });
      });
    }
  };

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
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <div className="w-full lg:w-1/2 text-center py-8">
              <div className="">
                <div className="text-grey-darker mb-2">
                  <span className="text-3xl align-top">KES</span>
                  <span className="text-5xl animate-price-color">1</span>
                  <span className="text-3xl align-top animate-price-color">
                    .00
                  </span>
                </div>
                <div className="text-sm uppercase text-grey tracking-wide">
                  PRICE PER 1 SHARE (SHA)
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 text-center py-8">
              <div className="text-grey-darker mb-2">
                <span className="text-3xl align-top">SHA</span>
                <span className="text-3xl lg:text-5xl animate-price-color">
                  1,000,000,000
                </span>
                <span className="text-3xl align-top animate-price-color">
                  .00
                </span>
              </div>
              <div className="text-sm uppercase text-grey tracking-wide">
                TOTAL SHARES RESERVE (SHA)
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-center px-6">
            <div className="w-full lg:w-1/2 m-4">
              <h3 className="text-lg font-semibold dark:bg-gray-700 dark:text-white text-center bg-gray-50 border-r border-l border-t border-blue-500">
                Buy Shares
                <p className="text-sm pl-2 pr-2">
                  Buy Shares from other users at a rate 1SHA = 1KES.
                </p>
              </h3>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 dark:text-white border border-blue-500">
                <div className="flex flex-row text-center justify-between">
                  <p className="font-semibold mb-1 text-blue-500">SHARES</p>

                  <p className="mr-1 w-12 h-6 font-semibold text-blue-500">
                    ORDER
                  </p>
                </div>

                {buyPrices.map((price: any, index: any) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between border-t border-blue-500"
                  >
                    <p className="font-semibold mb-1">{price} SHA</p>
                    <button
                      className="w-12 h-6 bg-blue-500 text-white"
                      type="button"
                      onClick={() => handleBuy(price)}
                    >
                      Buy
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 m-4">
              <h3 className="text-lg dark:bg-gray-700 dark:text-white font-semibold text-center bg-gray-50 border-r border-l border-t border-red-500">
                Sell Shares
                <p className="text-sm pl-2 pr-2">
                  Gain 50% Profit when someone buys your Shares.
                </p>
              </h3>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 dark:text-white border border-red-500">
                <div className="flex flex-row text-center justify-between">
                  <p className="font-semibold mb-1 text-red-500">SHARES</p>

                  <p className="mr-1 w-12 h-6 font-semibold text-red-500">
                    ORDER
                  </p>
                </div>
                {sellPrices.map((price: any, index: any) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between border-t border-red-500"
                  >
                    <p className="font-semibold mb-1">{price} SHA</p>

                    <button
                      className="w-12 h-6 bg-red-500 text-white hover:bg-red-600"
                      type="button"
                      onClick={() => handleSell(price)}
                    >
                      Sell
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white p-6 rounded-lg shadow-lg m-5">
            {selectedType === "buy" && (
              <h3 className="font-bold text-lg text-center mb-4">
                Confirm {selectedType} of {selectedID} Shares ?
                <p className="text-sm">
                  Amount of {selectedID} KES will be deducted from your Cash
                  balance.
                </p>
              </h3>
            )}
            {selectedType === "sell" && (
              <h3 className="font-bold text-lg text-center mb-4">
                Confirm {selectedType} of {selectedID} Shares ?
                <p className="text-sm">
                  Amount of {selectedID} SHA will be deducted from your Shares
                  balance.
                </p>
              </h3>
            )}

            <div className="flex justify-between">
              <button
                disabled={isloading}
                onClick={handleSendOrder}
                type="button"
                className={`px-4 py-2 text-white font-semibold rounded-md transition-colors duration-300 ease-in-out ${
                  isloading
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300"
                }`}
              >
                {isloading ? (
                  <span className="flex justify-center items-center bg-green-500">
                    <ScaleLoader
                      color="white"
                      loading={true}
                      height={20}
                      width={2}
                    />
                    <span className="ml-2">Sending order...</span>
                  </span>
                ) : (
                  "Confirm"
                )}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuySellShares;
