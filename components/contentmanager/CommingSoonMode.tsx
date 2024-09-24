"use client";
import { UpdateSettingsData } from "@/actions/content-manager";
import React, { ChangeEvent, useState, useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";

const CommingSoonMode = ({ settings }: any) => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    commingSoonAt: settings?.commingSoonAt,
    status: settings?.status,
    id: settings?.id,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Invalid params!");
      return;
    }

    if (formData.commingSoonAt !== "") {
      const settingsData = {
        commingSoonAt: formData.commingSoonAt,
        status: "comming-soon",
        id: settings?.id,
      };

      // Save
      startTransition(() => {
        UpdateSettingsData(settingsData)
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
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Enable Coming Soon Mode
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-4">
            <label
              htmlFor="commingSoonAt"
              className="block text-gray-700 dark:text-white font-medium mb-2"
            >
              Launch Date
            </label>
            <input
              disabled={isPending}
              type="datetime-local"
              id="commingSoonAt"
              className="border border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white rounded-md w-full px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.commingSoonAt}
            />
          </div>
        </div>
        <div className="mt-6">
          <button
            disabled={isPending}
            onClick={handleSubmit}
            type="button"
            className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300 ease-in-out ${
              isPending
                ? "bg-blue-600 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300"
            }`}
          >
            {isPending ? (
              <span className="flex justify-center items-center bg-blue-600">
                <ScaleLoader
                  color="white"
                  loading={true}
                  height={20}
                  width={2}
                />
                <span className="ml-2">Saving Coming Soon Settings...</span>
              </span>
            ) : (
              "Save Coming Soon Settings"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default CommingSoonMode;
