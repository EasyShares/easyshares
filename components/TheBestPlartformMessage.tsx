"use client";
import React from "react";
import Image from "next/image";

const TheBestPlartformMessage = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center mb-12 p-5 bg-gray-100 shadow-xl">
      <div className="md:w-1/2 mb-8 md:mb-0 order-2 md:order-1">
        <Image
          width={400}
          height={400}
          src="/img/bestplartformrocketing.jpeg"
          alt="Step 2"
          className="rounded-lg shadow-xl p-5"
        />
      </div>
      <div className="md:w-1/2 md:pl-8">
        <h3 className="text-2xl font-semibold mb-4">
          The Most Popular and Only Shares Exchange Platform
        </h3>
        <p className="text-lg mb-6 mr-5">
          We are the most popular and only shares exchange platform. At
          EasyShares, we provide a unique space dedicated solely to the exchange
          of shares, offering users unparalleled access to a diverse array of
          shares. Our platform prioritizes transparency, security, and ease of
          use, empowering investors to seamlessly buy and sell shares with
          confidence. Join us today and discover a new way to navigate the world
          of shares exchange.
        </p>
      </div>
    </div>
  );
};

export default TheBestPlartformMessage;
