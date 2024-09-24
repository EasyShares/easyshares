import React, { Suspense } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import NewPassForm from "@/components/auth/NewPassForm";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "New Password",
};

const RegisterPage = () => {
  return (
    <Suspense>
      <section className="bg-gray-50 dark:bg-gray-900 h-100">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
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
          <NewPassForm></NewPassForm>
        </div>
      </section>{" "}
      <Footer></Footer>
    </Suspense>
  );
};

export default RegisterPage;
