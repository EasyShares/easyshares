"use client";
import React, { ChangeEvent, useState, useTransition } from "react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import { Login } from "@/actions/login";
import ShowPassIcon from "../svg/ShowPassIcon";
import HidePassIcon from "../svg/HidePassIcon";
import { ScaleLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { UpdateOnlineUsers } from "@/actions/online-users";

const SignInForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl: any = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    code: "",
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

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  function UpdateOnlineUsersInfo() {
    const data = {
      type: "login",
    };
    UpdateOnlineUsers(data)
      .then((data: any) => {
        return;
      })
      .catch((error) => {
        return;
      });
  }

  const handleSubmit = async () => {
    if (formData.email === "" || formData.password === "") {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Email format is invalid.");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (formData.code) {
      if (formData.code.length !== 6) {
        toast.error("Code must be 6 digits long.");
        return;
      }
    }

    startTransition(() => {
      Login(formData, callbackUrl)
        .then((data: any) => {
          const twofa = data?.twofactor;
          const success = data?.success;
          const err = data?.error;
          const message = data?.message;
          if (twofa) {
            setShowTwoFactor(true);
            toast.success(`${message}`, {
              duration: 10000,
            });
          }
          if (success) {
            toast.success(`${message}`);
            UpdateOnlineUsersInfo();
          }
          if (err) {
            toast.error(`${message}`);
          }
        })
        .catch((error) => {
          return;
        });
    });
  };

  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {!showTwoFactor ? <>Sign In</> : <>Two Factor Authentication</>}
        </h2>
        <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
          {!showTwoFactor ? (
            <>
              {" "}
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
            </>
          ) : (
            <>
              {" "}
              <div>
                <label
                  htmlFor="code"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Two Factor Code
                </label>
                <div className="relative">
                  <input
                    disabled={isPending}
                    type="text"
                    name="code"
                    id="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Code"
                  />
                </div>
              </div>
            </>
          )}

          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Don&apos;t have an account?{" "}
            <Link href="/auth/register" className="text-blue-500">
              Sign Up
            </Link>
          </p>
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Forgot your password?{" "}
            <Link href="/auth/reset-password" className="text-blue-500">
              Reset password
            </Link>
          </p>
          {!showTwoFactor ? (
            <>
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
                    <span className="ml-2">Signing In...</span>
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </>
          ) : (
            <>
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
                    <span className="ml-2">Verifying Code...</span>
                  </span>
                ) : (
                  "Verify Code"
                )}
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default SignInForm;
