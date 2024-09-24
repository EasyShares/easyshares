"use client";
import { Toaster, toast } from "sonner";
import React, { ChangeEvent, useState, useTransition } from "react";
import { Contact } from "@/actions/contact";
import { ScaleLoader } from "react-spinners";

const ContactForm = () => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please fill in all fields.");

      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Email format is invalid.");
      return;
    }

    // Save
    startTransition(() => {
      Contact(formData)
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

    // Reset form data
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-8">
            Get In Touch
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Contact Details
              </h2>
              <div className="flex items-center space-x-4 mb-4">
                <svg
                  className="w-6 h-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <p className="text-gray-800 dark:text-white">+254 791 949725</p>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <svg
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v2m0 4h.01m-6.938-2H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2v9a2 2 0 01-2 2h-1.062l-4.938 3V12m0-2l4.938-3M12 21l-4.938-3m4.938 3L16 18"
                  />
                </svg>
                <p className="text-gray-800 dark:text-white">
                  support@easyshares.pro
                </p>
              </div>
              <div className="flex items-center space-x-4 mb-4">
                <svg
                  className="w-6 h-6 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.5 2a.5.5 0 01.5.5v1.053c2.59.278 4.682 2.37 4.96 4.96H20.5a.5.5 0 010 1h-3.042c-.278 2.59-2.37 4.682-4.96 4.96V20.5a.5.5 0 01-1 0v-3.042c-2.59-.278-4.682-2.37-4.96-4.96H3.5a.5.5 0 010-1h3.042c.278-2.59 2.37-4.682 4.96-4.96V2.5a.5.5 0 01.5-.5zM12 7a5 5 0 110 10 5 5 0 010-10z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-gray-800 dark:text-white">
                  Chat via WhatsApp
                </p>
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-800 dark:text-white mb-1"
                >
                  Full Name
                </label>
                <input
                  disabled={isPending}
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-md p-3 w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your Full Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-800 dark:text-white mb-1"
                >
                  Email Address
                </label>
                <input
                  disabled={isPending}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-md p-3 w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your email address"
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-800 dark:text-white mb-1"
                >
                  Subject
                </label>
                <input
                  disabled={isPending}
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-md p-3 w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Subject of your message"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-800 dark:text-white mb-1"
                >
                  Message
                </label>
                <textarea
                  disabled={isPending}
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 rounded-md p-3 w-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your message"
                />
              </div>
              <div>
                <button
                  disabled={isPending}
                  onClick={handleSubmit}
                  type="button"
                  className={`w-full py-3 px-6 text-white font-medium rounded-md text-sm transition-colors duration-300 ease-in-out ${
                    isPending
                      ? "bg-green-500 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
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
                      <span className="ml-2">Sending Message...</span>
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>
          <p className="mt-8 text-gray-800 dark:text-white">
            We typically respond in under 5 minutes. Thank you for reaching out!
          </p>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
