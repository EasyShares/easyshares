"use client";
import { UpdateSettingsData } from "@/actions/content-manager";
import React, { ChangeEvent, useState, useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";

const WebsiteProfile = ({ settings }: any) => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    id: settings?.id,
    websitename: settings?.websitename,
    twitter: settings?.twitter,
    youtube: settings?.youtube,
    tiktok: settings?.tiktok,
    facebook: settings?.facebook,
    status: settings?.status,
    disclaimer: settings?.disclaimer,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    // Save
    startTransition(() => {
      UpdateSettingsData(formData)
        .then((data: any) => {
          const success = data.success;
          const message = data.message;
          if (success) {
            toast.success(`${message}`);
          } else {
            toast.error(`${message}`);
          }
        })
        .catch((error) => {
          toast.error("An error occured, try again!");
        });
    });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Website Profile
        </h2>
        {settings?.status === "live" ? (
          <>
            <div className="h-5 w-20 text-center mb-2 shadow-xl font-bold text-sm text-white bg-green-500 rounded-md">
              Online
            </div>
          </>
        ) : (
          <>
            <div className="h-5 w-20 text-center mb-2 shadow-xl font-bold text-sm text-white bg-red-500 rounded-md">
              Offline
            </div>
          </>
        )}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-4">
            <label
              htmlFor="websitename"
              className="block dark:text-white text-gray-700 font-medium mb-2"
            >
              Website Name
            </label>
            <input
              type="text"
              id="websitename"
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.websitename}
            />
          </div>
          <div className="md:w-1/2 pt-4 lg:pt-0">
            <label
              htmlFor="twitter"
              className="block dark:text-white text-gray-700 font-medium mb-2"
            >
              Twitter Url
            </label>
            <input
              type="url"
              id="twitter"
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.twitter}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-4">
          <div className="md:w-1/2 pr-4">
            <label
              htmlFor="youtube"
              className="block dark:text-white text-gray-700 font-medium mb-2"
            >
              Youtube Url
            </label>
            <input
              type="url"
              id="youtube"
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.youtube}
            />
          </div>
          <div className="md:w-1/2 pt-4 lg:pt-0">
            <label
              htmlFor="tiktok"
              className="block dark:text-white text-gray-700 font-medium mb-2"
            >
              Tiktok Url
            </label>
            <input
              type="url"
              id="tiktok"
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.tiktok}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-4">
          <div className="md:w-1/2 pr-4">
            <label
              htmlFor="facebook"
              className="block dark:text-white text-gray-700 font-medium mb-2"
            >
              Facebook Url
            </label>
            <input
              type="url"
              id="facebook"
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.facebook}
            />
          </div>
          <div className="md:w-1/2 pt-4 lg:pt-0">
            <label
              htmlFor="disclaimer"
              className="block dark:text-white text-gray-700 font-medium mb-2"
            >
              Disclaimer
            </label>
            <input
              type="text"
              id="disclaimer"
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.disclaimer}
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            disabled={isPending}
            onClick={handleSubmit}
            type="button"
            className={` py-3 px-6 text-white font-semibold rounded-md transition-colors duration-300 ease-in-out ${
              isPending
                ? "bg-blue-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            }`}
          >
            {isPending ? (
              <span className="flex justify-center items-center bg-blue-500">
                <ScaleLoader
                  color="white"
                  loading={true}
                  height={20}
                  width={2}
                />
                <span className="ml-2">Saving Website Settings...</span>
              </span>
            ) : (
              "Save Website Settings"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default WebsiteProfile;
