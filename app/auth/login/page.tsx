import React, { Suspense } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Link from "next/link";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Welcome back, login to your account!",
};

const SignInPage = () => {
  return (
    <Suspense>
      <section className="bg-gray-50 dark:bg-gray-900 h-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link
            href="/"
            passHref
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
          <SignInForm></SignInForm>
        </div>
      </section>
      <Footer></Footer>
    </Suspense>
  );
};

export default SignInPage;
