"use client";
import React from "react";
import Image from "next/image";

const Part4Section: React.FC = () => {
  return (
    <section className="bg-white py-20 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-semibold mb-8 text-center">
            How EasyShares Works
          </h2>
          <div className="flex flex-col md:flex-row md:items-center mb-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image
                width={500}
                height={500}
                src="/img/easysharessignup.png"
                alt="Step 1"
                className="rounded-lg shadow-xl"
                style={{ height: 400, width: 300 }}
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h3 className="text-2xl font-semibold mb-4">Step 1: Sign Up</h3>
              <p className="text-lg mb-6">
                Register for an EasyShares account to gain access to our
                innovative platform. Verify your email to begin buying and
                selling shares.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center mb-12">
            <div className="md:w-4/5 mb-8 md:mb-0 order-2 md:order-1">
              <Image
                width={800}
                height={1000}
                src="/img/easysharesdash.png"
                alt="Step 2"
                className="rounded-lg shadow-xl"
                style={{ height: 250, width: 1000 }}
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <h3 className="text-2xl font-semibold mb-4">
                Step 2: Deposit funds into your account
              </h3>
              <p className="text-lg mb-6 mr-5">
                Deposit money into your Cash balance account. Deposit the amount
                that aligns with your financial ability upto Ksh 100,000.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="md:w-1/2 md:pl-8">
              <h3 className="text-2xl font-semibold mb-4">
                Step 3: Start Exchanging Shares
              </h3>
              <p className="text-lg mb-6">
                Once you&apos;ve setup everything, you can start buying shares
                at a lower price. Sell them to other users at a higher price
                with our custom Rate of Investment (ROI) system, maximizing your
                profit potential.
              </p>
            </div>

            <div className=" mb-8 md:mb-0">
              <Image
                width={1000}
                height={480}
                src="/img/easysharesbuy.png"
                alt="Step 3"
                className="rounded-lg shadow-xl"
                style={{ height: 480, width: 600 }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Part4Section;
