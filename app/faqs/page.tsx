import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Frequently Asked Questions",
};

const Faq = () => {
  return (
    <>
      <Nav></Nav>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-semibold text-center mb-8">
            Frequently Asked Questions
          </h1>
          {faqdata.map((item, index) => (
            <div key={item.question} className="mb-8">
              <button className="w-full text-left p-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-300">
                <span className="text-lg text-gray-800 font-semibold">
                  {item.question}
                </span>
              </button>
              <div className="mt-2 text-gray-600">{item.answer}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

const faqdata = [
  {
    question: "What is EasyShares?",
    answer:
      "EasyShares is an online platform that facilitates the purchase and sale of shares at discounted rates, allowing users to buy shares at a lower price and sell them for a profit using our unique Rate of Investment (ROI) system.",
  },
  {
    question: "How does EasyShares work?",
    answer:
      "Users can purchase shares at a lower price and later sell them to other users at a higher price, at a customized their ROI of upto 50%. Our platform matches buyers and sellers automatically on a 'First come, first served' basis, ensuring efficient transactions.",
  },
  {
    question: "What are the transaction limits per user?",
    answer:
      "The maximum shares that can be bought per transaction are KES 0, and the maximum shares that can be sold per transaction are KES 5000. Conversely, the minimum shares that can be sold per transaction are KES 500, and the minimum shares that can be bought per transaction are 375. These limits apply per transaction.",
  },
  {
    question: "How does EasyShares generate revenue?",
    answer:
      "EasyShares applies a 5% deduction on all profits made per transaction on the platform.",
  },
  {
    question:
      "What are the fixed ROI rates and prices available on EasyShares?",
    answer:
      "The platform offers fixed ROI rates ranging upto 50%. Additionally, buy prices range from 375 KES to 7500 KES, while sell prices range from 500 KES to 5000 KES.",
  },
  {
    question: "Can you provide details about EasyShares' website?",
    answer:
      "1. Website Name: EasyShares\n2. Website URL: https://easyshares.pro\n3. Website Phone: (not provided)\n4. Support Email: support@easyshares.pro\n5. Information Email: info@easyshares.pro",
  },
  {
    question:
      "What are the transaction rates for Mpesa deposits and withdrawals?",
    answer: (
      <>
        <p>Deposit:</p>
        <ul>
          <li>Maximum deposit: 100,000 KES</li>
          <li>Minimum deposit: 375 KES</li>
        </ul>
        <p>Withdrawal:</p>
        <ul>
          <li>Maximum withdrawal: 100,000 KES</li>
          <li>Minimum withdrawal: 100 KES</li>
        </ul>
        <h3 className="font-bold mb-2">Withdrawal Fees:</h3>
        <p className="font-semibold text-sm">
          5% of the withdrawal amount per transaction!
        </p>
        <p className="mt-4">
          For any further inquiries or assistance, feel free to reach out to us
          via email at{" "}
          <a href="mailto:support@easyshares.pro" className="text-blue-500">
            support@easyshares.pro
          </a>
          .
        </p>
      </>
    ),
  },
];

export default Faq;
