import React from "react";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import ViewLicenceButton from "@/components/ViewLicenceButton";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Legalities Info",
};

const LicensePage: React.FC = () => {
  return (
    <>
      <Nav></Nav>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-8">
            EasyShares Legalities Info
          </h1>
          <p className="mb-6">
            <strong>Legalities and Government Authorization</strong>
          </p>
          <p className="mb-6">
            EasyShares operates in compliance with all relevant legal
            requirements and regulations set forth by the government of Kenya.
            We are a registered entity authorized to facilitate shares exchange
            activities within the jurisdiction of Kenya. Our operations are
            conducted in accordance with the laws governing financial
            transactions, data protection, and consumer rights in Kenya.
          </p>
          <p className="mb-6">
            As a government-authorized platform, EasyShares adheres to strict
            standards of transparency, security, and accountability. We are
            licensed under license number 0001234ERW, demonstrating our
            commitment to regulatory compliance and responsible business
            practices.
          </p>
          <p className="mb-6">
            Our authorization to operate is subject to periodic review and
            scrutiny by regulatory authorities to ensure ongoing compliance with
            applicable laws and regulations. We are dedicated to maintaining the
            trust and confidence of our users by operating in a manner that
            prioritizes integrity, fairness, and regulatory compliance.
          </p>
          <ViewLicenceButton></ViewLicenceButton>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default LicensePage;
