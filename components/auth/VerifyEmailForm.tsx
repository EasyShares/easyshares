"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import InboxIcon from "../svg/InboxIcon";
import { useSearchParams } from "next/navigation";

const VerifyEmailForm = () => {
  const [sessionEmail, setSessionEmail] = useState("NULL");
  const searchParams = useSearchParams();

  useEffect(() => {
    const email: any = searchParams.has("email")
      ? searchParams.get("email")
      : "null";
    setSessionEmail(email);
  }, [searchParams]);

  return (
    <>
      <div className="w-full p-6 bg-white rounded-lg shadow-md dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <h2 className="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Email Verification
        </h2>
        <p className="text-sm text-gray-900 dark:text-white">
          An email has been sent to your registered email address{" "}
          <span className="font-bold text-x"> {sessionEmail}</span>. Please
          check your inbox for the verification link sent to you to and follow
          the details to verify your account.
        </p>
        <div className="flex flex-row justify-center items-center mb-4">
          <InboxIcon />
        </div>
        <Link
          href="/auth/login"
          className="flex items-center justify-center text-blue-500"
        >
          Back to Login
        </Link>
      </div>
    </>
  );
};

export default VerifyEmailForm;
