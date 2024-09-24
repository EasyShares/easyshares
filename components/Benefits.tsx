"use client";
import React from "react";
import Image from "next/image";

const Part3Section: React.FC = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mr-5">
            <Image
              width={800}
              height={500}
              src="/img/open-padlock-concept-illustration.jpg"
              alt="Part 3 Image"
              className="rounded-lg shadow-xl mb-8 lg:mb-0"
              style={{ maxHeight: 500 }}
            />
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-semibold mb-4">
              Unlock Investment Opportunities
            </h2>
            <p className="text-lg lg:text-xl mb-6">
              EasyShares offers a revolutionary platform where users can buy and
              sell shares at competitive prices, leveraging our innovative Rate
              of Investment (ROI) system.
            </p>
            <ul className="list-disc list-inside">
              <li className="mb-2">
                Lower Cost Shares: Purchase shares at a reduced price compared
                to traditional markets.
              </li>
              <li className="mb-2">
                Customized ROI: Choose your desired Rate of Investment (ROI)
                upto 50% when selling shares, maximizing your profit potential.
              </li>
              <li className="mb-2">
                Automated Matching: Our platform uses a &quot;First come, first
                served&quot; policy to match buyers and sellers seamlessly,
                ensuring swift transactions.
              </li>
              <li className="mb-2">
                Immediate Execution: Transactions are processed promptly upon
                order placement, providing efficiency and liquidity.
              </li>
            </ul>
            <p className="mt-4">
              Join our growing community of investors and explore the
              possibilities with EasyShares today!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Part3Section;
