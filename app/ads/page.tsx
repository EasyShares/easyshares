import React from "react";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Advertise With Us",
};

const AdsPage = () => {
  return (
    <>
      <Nav></Nav>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Advertise With Us
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Why Advertise With Us?
              </h2>
              <p className="text-gray-700 mb-4">
                Our platform offers a unique opportunity to advertise your
                products or services to a diverse audience. With our
                user-friendly interface and high engagement rates, your ads are
                sure to reach potential customers effectively.
              </p>
              <p className="text-gray-700 mb-4">
                Whether you&apos;re looking to promote your brand, increase
                website traffic, or drive sales, our advertising solutions can
                help you achieve your goals.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Advertising Options
              </h2>
              <p className="text-gray-700 mb-4">
                We offer various advertising options tailored to meet your
                specific needs and budget. From banner ads to sponsored content,
                we have the right solution for you.
              </p>
              <p className="text-gray-700 mb-4">
                Our advertising packages include detailed analytics and
                reporting, allowing you to track the performance of your
                campaigns in real-time and make informed decisions.
              </p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              To learn more about our advertising options and pricing, or to
              discuss a customized advertising solution, please contact us at{" "}
              <a
                href="mailto:ads@easyshares.pro"
                className="text-blue-600 hover:underline"
              >
                ads@easyshares.pro
              </a>
              .
            </p>
            <p className="text-gray-700">
              We look forward to partnering with you and helping you achieve
              your advertising objectives.
            </p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AdsPage;
