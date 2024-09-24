"use client";
import React, { ChangeEvent, useState, useTransition } from "react";
import { toast } from "sonner";
import { CreateCompetition } from "@/actions/content-manager";
import { ScaleLoader } from "react-spinners";

const AddCompetition = () => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: "",
    month: "",
    startAt: "",
    endAt: "",
    status: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please fill in all fields.");
      return;
    }

    // save
    startTransition(() => {
      CreateCompetition(formData)
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
          toast.error("An error occured, try again");
        });
    });

    setFormData({
      name: "",
      month: "",
      startAt: "",
      endAt: "",
      status: "",
    });
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Create Competition
        </h2>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-4">
            <label
              htmlFor="name"
              className="block dark:text-white text-gray-700 font-medium mb-2"
            >
              Competition Name
            </label>
            <input
              type="text"
              id="name"
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.name}
            />
          </div>
          <div className="md:w-1/2 pt-4 lg:pt-0">
            <label
              htmlFor="month"
              className="block dark:text-white text-gray-700 font-medium mb-2"
            >
              Month
            </label>
            <input
              type="text"
              id="month"
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.month}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-4">
          <div className="md:w-1/2 pr-4">
            <label
              htmlFor="startAt"
              className="block dark:text-white text-gray-700 font-medium mb-2"
            >
              Start At
            </label>
            <input
              type="datetime-local"
              id="startAt"
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.startAt}
            />
          </div>
          <div className="md:w-1/2 pt-4 lg:pt-0">
            <label
              htmlFor="endAt"
              className="block dark:text-white text-gray-700 font-medium mb-2"
            >
              End At
            </label>
            <input
              type="datetime-local"
              id="endAt"
              className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
              onChange={handleChange}
              value={formData.endAt}
            />
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label
            htmlFor="status"
            className="block dark:text-white text-gray-700 font-medium mb-2"
          >
            Competition Status
          </label>
          <select
            disabled={isPending}
            className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
            id="status"
            onChange={handleChange}
            value={formData.status}
          >
            <option value="">Select Status</option>
            <option value="ongoing">Ongoing</option>
            <option value="upcoming">Upcoming</option>
          </select>
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
                <span className="ml-2">Creating Competition...</span>
              </span>
            ) : (
              "Create Competition"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCompetition;
