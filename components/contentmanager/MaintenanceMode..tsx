"use client";
import { UpdateSettingsData } from "@/actions/content-manager";
import React, { ChangeEvent, useState, useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";

const UnderMaintenanceMode = ({ settings }: any) => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    status: settings?.status,
    id: settings?.id,
  });

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: checked ? "under-maintenance" : "live",
    }));
  };

  const handleSubmit = () => {
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Invalid params!");
      return;
    }

    if (formData.status !== "under-maintenance" && formData.status !== "live") {
      toast.error("Invalid params!");
      return;
    }

    const settingsData = {
      commingSoonAt: "",
      status: formData.status,
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
  };

  return (
    <>
      {" "}
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Under Maintenance Mode
        </h2>
        <div className="flex items-center">
          <input
            disabled={isPending}
            type="checkbox"
            id="status"
            className="mr-2"
            checked={formData.status === "under-maintenance"}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="status"
            className="text-gray-700 dark:text-white font-medium"
          >
            Enable Under Maintenance Mode
          </label>
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
                <span className="ml-2">
                  Saving Under Maintenance Settings...
                </span>
              </span>
            ) : (
              "Save Under Maintenance Settings"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default UnderMaintenanceMode;
