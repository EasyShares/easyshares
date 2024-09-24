"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeroSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 leading-tight">
              Invest with Confidence
            </h1>
            <p className="text-lg lg:text-xl mb-6">
              Your Ultimate Destination for Financial Freedom in Kenya! Join us
              today and unlock your wealth potential effortlessly. Start your
              journey towards financial empowerment now!
            </p>
            <div className="flex">
              <Link
                href="auth/register"
                className="bg-white text-blue-800 font-semibold py-3 px-6 rounded-full mr-4 hover:bg-blue-700 hover:text-white transition duration-300"
              >
                Get Started
              </Link>
              <Link
                href="faqs"
                className="border border-white text-white font-semibold py-3 px-6 rounded-full hover:bg-white hover:text-blue-800 transition duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <Image
              width={800}
              height={400}
              src="/img/portfolio-managerillustrations.avif"
              alt="Hero Image"
              className="rounded-lg shadow-xl"
              style={{ height: 400 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
