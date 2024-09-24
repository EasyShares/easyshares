"use client";
import React, { ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { ExtendedUser } from "@/next-auth";
import { NotificationSettings } from "@/actions/account";
import { ScaleLoader } from "react-spinners";

interface UserInfoProps {
  user?: ExtendedUser;
}

const NotificationSet = ({ user }: UserInfoProps) => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    emailNotifications: user?.emailNotifications,
    smsNotifications: user?.smsNotifications,
  });

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: checked ? "on" : "off",
    }));
  };

  const handleSaveSettings = () => {
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Invalid params!");
      return;
    }

    if (
      formData.smsNotifications !== "on" &&
      formData.smsNotifications !== "off" &&
      formData.emailNotifications !== "on" &&
      formData.emailNotifications !== "off"
    ) {
      toast.error("Invalid params!");
      return;
    }

    // Save
    startTransition(() => {
      NotificationSettings(formData)
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
        <h2 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
          Notification Settings
        </h2>
        <div className="flex items-center">
          <input
            disabled={isPending}
            type="checkbox"
            id="emailNotifications"
            className="mr-2"
            checked={formData.emailNotifications === "on"}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="emailNotifications"
            className="text-gray-700 font-medium dark:text-white"
          >
            Email Notifications
          </label>
        </div>
        <div className="flex items-center mt-4">
          <input
            disabled={isPending}
            type="checkbox"
            id="smsNotifications"
            className="mr-2"
            checked={formData.smsNotifications === "on"}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor="smsNotifications"
            className="text-gray-700 font-medium dark:text-white"
          >
            SMS Notifications
          </label>
        </div>
        <div className="mt-6">
          <button
            disabled={isPending}
            onClick={handleSaveSettings}
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
                <span className="ml-2">Updating Notification Settings...</span>
              </span>
            ) : (
              "Save Notification Settings"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default NotificationSet;
