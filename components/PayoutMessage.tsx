"use client";
import React from "react";
import Image from "next/image";

const PayoutSystem = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center bg-green-300 shadow-xl p-5">
      <div className="md:w-1/2 mb-8 md:mb-0">
        <Image
          width={400}
          height={400}
          src="/img/payoutmpesa.jpeg"
          alt="Step 3"
          className="rounded-lg shadow-xl"
        />
      </div>
      <div className="md:w-1/2 md:pl-8">
        <div className="text-lg mb-6">
          <h1 className="text-3xl font-semibold mb-4">Payout System</h1>
          <p className="text-lg mb-4">
            Our money payment agent is M-Pesa, providing convenient and reliable
            transactions. Deposits and withdrawals are instant, ensuring
            seamless transactions for our users.
          </p>
          <p className="text-lg mb-4">
            <strong>Deposit:</strong>
          </p>
          <ul className="list-disc list-inside text-lg mb-4">
            <li>Maximum deposit: 100,000 KES</li>
            <li>Minimum deposit: 375 KES</li>
          </ul>
          <p className="text-lg mb-4">
            <strong>Withdrawal:</strong>
          </p>
          <ul className="list-disc list-inside text-lg mb-4">
            <li>Maximum withdrawal: 100,000 KES</li>
            <li>Minimum withdrawal: 100 KES</li>
          </ul>
          <p className="text-lg">
            All transaction charges are the ones provided by M-Pesa.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PayoutSystem;
