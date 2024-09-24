"use client";
import { ReplyContactEmail } from "@/actions/content-manager";
import React, { ChangeEvent, useState, useTransition } from "react";
import { ScaleLoader } from "react-spinners";
import { toast } from "sonner";

interface Props {
  Id: any;
  onClose: any;
}

const ReplyContact: React.FC<Props> = ({ Id, onClose }) => {
  const [isPending, startTransition] = useTransition();
  const closeModal = () => {
    onClose();
  };

  const id = Id.id;
  const name = Id.name;
  const email = Id.email;
  const subject = Id.subject;
  const message = Id.message;

  const [formData, setFormData] = useState({
    id: id,
    name: name,
    email: email,
    subject: subject,
    message: message,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    // Save
    startTransition(() => {
      ReplyContactEmail(formData)
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
          toast.error("An error occured, try again!");
        });
    });
  };

  return (
    <>
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white p-6 rounded-lg shadow-lg m-5">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Reply to Contact Email: {email}
          </h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 pr-4">
              <label
                htmlFor="name"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                disabled={isPending}
                type="text"
                id="name"
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.name}
                readOnly
              />
            </div>
            <div className="md:w-1/2 pt-4 lg:pt-0">
              <label
                htmlFor="email"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                disabled={isPending}
                type="email"
                id="email"
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.email}
                readOnly
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-4">
            <div className="md:w-1/2 pr-4">
              <label
                htmlFor="subject"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Subject
              </label>
              <input
                disabled={isPending}
                type="text"
                id="subject"
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.subject}
                readOnly
              />
            </div>
            <div className="md:w-1/2 pt-4 lg:pt-0">
              <label
                htmlFor="message"
                className="block dark:text-white text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                disabled={isPending}
                id="message"
                className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md lg:w-80 px-4 py-2 focus:outline-none focus:border-blue-500"
                onChange={handleChange}
                value={formData.message}
                rows={4}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-between mt-5 flex-wrap">
            <button
              disabled={isPending}
              onClick={handleSubmit}
              type="button"
              className={` px-4 py-2 text-white font-semibold  rounded-md text-sm transition-colors duration-300 ease-in-out ${
                isPending
                  ? "bg-green-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300"
              }`}
            >
              {isPending ? (
                <span className="flex justify-center items-center bg-green-500">
                  <ScaleLoader
                    color="white"
                    loading={true}
                    height={20}
                    width={2}
                  />
                  <span className="ml-2">Sending Reply Email...</span>
                </span>
              ) : (
                "Send Reply"
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

export default ReplyContact;
