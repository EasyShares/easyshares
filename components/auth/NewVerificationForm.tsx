"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LoaderSpin from "../svg/LoaderSpin";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { Toaster, toast } from "sonner";

const NewVerificationForm = () => {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    // Ensure token is present, then initiate verification
    const verifyEmail = async () => {
      if (!token) {
        toast.error("Verification token is missing!");
        setStatus("error");
        return;
      }

      try {
        const response = await newVerification(token);
        if (response.success) {
          toast.success(response.message);
          setStatus("success");
          setTimeout(() => {
            window.location.href = "/auth/login";
          }, 2000); // Redirect after 2 seconds
        } else {
          throw new Error(response.message || "Verification failed");
        }
      } catch (err: any) {
        toast.error(err.message || "An error occurred, please try again.");
        setStatus("error");
      }
    };

    // Initiate verification when component mounts
    verifyEmail();
  }, [token]);

  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <div className="w-full p-6 bg-white rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 className="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          {status === "loading" && "Verifying your email"}
          {status === "success" && "Email successfully verified"}
          {status === "error" && "Verification failed"}
        </h2>
        <div className="flex items-center justify-center">
          {status === "loading" && <LoaderSpin />}
          {status === "success" && (
            <div className="text-green-500 text-xl">Email Verified!</div>
          )}
          {status === "error" && (
            <div className="text-red-500 text-xl">Something went wrong!</div>
          )}
        </div>
        <p className="text-center text-sm text-gray-900 dark:text-white">
          {status === "loading" && "Please wait while we verify your email."}
        </p>
        <p className="text-center text-sm text-gray-900 dark:text-white">
          {status !== "loading" && (
            <>
              If you are not redirected,{" "}
              <Link href="/auth/login" className="text-blue-500">
                click here to Sign In
              </Link>
            </>
          )}
        </p>
      </div>
    </>
  );
};

export default NewVerificationForm;
