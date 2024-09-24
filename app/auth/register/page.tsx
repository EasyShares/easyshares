import React, { Suspense } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "@/components/auth/SignUpForm";
export const metadata: Metadata = {
  title: "Register",
  description:
    "Join EasyShares and start trading shares effortlessly. Register now to access our innovative platform and begin your investment journey.",
};

const RegisterPage = () => {
  return (
    <Suspense>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center p-5">
        <Link
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <Image
            width={45}
            height={25}
            src="/img/logo-only.png"
            alt="Hero Image"
            className="rounded-lg"
          />
          EasyShares
        </Link>
        <SignUpForm></SignUpForm>
      </section>{" "}
      <Footer></Footer>
    </Suspense>
  );
};

export default RegisterPage;
