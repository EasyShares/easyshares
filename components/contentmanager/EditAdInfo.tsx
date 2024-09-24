"use client";
import { UpdateAd } from "@/actions/content-manager";
import React, { ChangeEvent, useState, useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";

interface Props {
  Id: any;
  onClose: any;
}

const EditAd: React.FC<Props> = ({ Id, onClose }) => {
  const [isPending, startTransition] = useTransition();
  const closeModal = () => {
    onClose();
  };

  const id = Id.id;
  const name = Id.name;
  const description = Id.description;
  const url = Id.url;
  const code = Id.code;
  const cname = Id.cname;
  const cemail = Id.cemail;
  const type = Id.type;
  const status = Id.status;

  const [formData, setFormData] = useState({
    id: id,
    name: name,
    description: description,
    url: url,
    code: code,
    cname: cname,
    cemail: cemail,
    type: type,
    status: status,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = () => {
    if (
      formData.name === "" ||
      formData.cname === "" ||
      formData.description === ""
    ) {
      toast.error(
        "Ad name, company name and ad description are required fields."
      );

      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.cemail)) {
      toast.error("Email format is invalid.");

      return;
    }

    if (!/^(banner|pop-up)$/.test(formData.type)) {
      toast.error("Ad type is invalid.");
      return;
    }

    if (!/^(active|inactive)$/.test(formData.status)) {
      toast.error("Ad type is invalid.");
      return;
    }

    if (formData.url) {
      const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlPattern.test(formData.url)) {
        toast.error("Ad URL format is invalid.");
        return;
      }
    }

    // save
    startTransition(() => {
      UpdateAd(formData)
        .then((data: any) => {
          const success = data.success;
          const message = data.message;
          if (success) {
            toast.success(`${message}`);
            closeModal();
          } else {
            toast.error(`${message}`);
          }
        })
        .catch((error) => {
          toast.error("An error occured, try again");
        });
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white p-6 rounded-lg shadow-lg m-5">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Edit Asset Information Name: {Id.name}
          </h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 pr-4">
              <label
                htmlFor="name"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Ad Name
              </label>
              <input
                disabled={isPending}
                type="text"
                id="name"
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.name}
              />
            </div>
            <div className="md:w-1/2 pt-4 lg:pt-0">
              <label
                htmlFor="url"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Ad Url
              </label>
              <input
                disabled={isPending}
                type="url"
                id="url"
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.url}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-4">
            <div className="md:w-1/2 pr-4">
              <label
                htmlFor="code"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Ad Code
              </label>
              <input
                disabled={isPending}
                type="text"
                id="code"
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.code}
              />
            </div>
            <div className="md:w-1/2 pt-4 lg:pt-0">
              <label
                htmlFor="cname"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Company Name
              </label>
              <input
                disabled={isPending}
                type="text"
                id="cname"
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.cname}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-4">
            <div className="md:w-1/2 pt-4 lg:pt-0">
              <label
                htmlFor="cemail"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Company Email
              </label>
              <input
                disabled={isPending}
                type="email"
                id="cemail"
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.cemail}
              />
            </div>
            <div className="md:w-1/2 pt-4 lg:pt-0">
              <label
                htmlFor="description"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Ad Description
              </label>
              <textarea
                disabled={isPending}
                id="description"
                className="h-32 dark:bg-gray-900 dark:border-gray-700 dark:text-white border border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.description}
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-4">
            <div className="md:w-1/2 pr-4">
              <label
                htmlFor="type"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Ad type
              </label>
              <select
                disabled={isPending}
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                id="type"
                onChange={handleChange}
                value={formData.type}
              >
                <option value="">Select Ad Type</option>
                <option value="banner">Banner</option>
                <option value="pop-up">Pop Up</option>
              </select>
            </div>
            <div className="md:w-1/2 pr-4">
              <label
                htmlFor="status"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Ad Status
              </label>
              <select
                disabled={isPending}
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                id="status"
                onChange={handleChange}
                value={formData.status}
              >
                <option value="">Select Ad Status</option>
                <option value="active">Active</option>
                <option value="inactive">InActive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between mt-5 flex-wrap">
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
                  <span className="ml-2">Updating Ad...</span>
                </span>
              ) : (
                "Save Changes"
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
    </>
  );
};

export default EditAd;
