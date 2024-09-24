"use client";
import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { Register } from "@/actions/register";
import HidePassIcon from "../svg/HidePassIcon";
import ShowPassIcon from "../svg/ShowPassIcon";
import { ScaleLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

const SignUpForm = () => {
  const searchParams = useSearchParams();
  const code: any = searchParams.has("referralCode")
    ? searchParams.get("referralCode")
    : "null";
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    phone: "",
    uplineCode: code,
    terms_privacy: "",
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

  const handleTermsPrivacyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      terms_privacy: checked ? "yes" : "",
    }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    if (!formData.terms_privacy) {
      toast.error("Accept the terms and privacy policy");
      return;
    }

    if (Object.values(formData).some((value) => value === "")) {
      toast.error("Please fill in all fields.");
      return;
    }

    const fullNameParts = formData.fullname.trim().split(" ");
    if (fullNameParts.length !== 2) {
      toast.error("Full Name should contain exactly two names.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Email format is invalid.");
      return;
    }

    if (!/^(2547\d{8}|2541\d{8}|07\d{8}|01\d{8})$/.test(formData.phone)) {
      toast.error("Phone number format is invalid.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (formData.uplineCode.length != 6 || formData.uplineCode == "") {
      formData.uplineCode = "null";
    }

    // Save
    startTransition(() => {
      Register(formData)
        .then((data: any) => {
          const success = data.success;
          const message = data.message;
          if (success) {
            toast.success(`${message}`);
            const url = data.url;
            setTimeout(() => {
              window.location.href = url;
            }, 1000);
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
      email: "",
      password: "",
      fullname: "",
      phone: "",
      uplineCode: code,
      terms_privacy: "",
    });
  };
  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mb-10 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Register
        </h2>
        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
          <div>
            <label
              htmlFor="fullname"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Full Name
            </label>
            <input
              disabled={isPending}
              type="text"
              name="fullname"
              id="fullname"
              value={formData.fullname}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email Address
            </label>
            <input
              disabled={isPending}
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <input
              disabled={isPending}
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Phone Number"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <div className="relative">
              <input
                disabled={isPending}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <ShowPassIcon /> : <HidePassIcon />}
              </button>
            </div>
          </div>
          <div>
            <label
              htmlFor="referralCode "
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Refferal Code
            </label>
            <input
              readOnly
              type="text"
              name="referralCode "
              id="referralCode "
              value={formData.uplineCode}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Refferal Code"
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                checked={formData.terms_privacy === "yes"}
                onChange={handleTermsPrivacyChange}
                id="terms_privacy"
                aria-describedby="terms_privacy"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms_privacy"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <Link
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="/terms"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="/privacy-policy"
                >
                  Privacy Policy
                </Link>{" "}
                of EasyShares.
              </label>
            </div>
          </div>
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500">
              Sign In
            </Link>
          </p>
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
                <span className="ml-2">Creating Account...</span>
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
