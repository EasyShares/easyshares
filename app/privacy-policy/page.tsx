import React from "react";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Privacy Policy",
};

const PrivacyPolicyPage: React.FC = () => {
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const lastUpdatedDate = new Date();

  return (
    <>
      <Nav></Nav>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-8">
            EasyShares Privacy Policy
          </h1>
          <p className="mb-6">Last updated: {formatDate(lastUpdatedDate)}</p>
          <p className="mb-6">
            EasyShares (&quot;us&quot;, &quot;we&quot;, or &quot;our&quot;)
            operates the EasyShares website (the &quot;Service&quot;). This page
            informs you of our policies regarding the collection, use, and
            disclosure of personal data when you use our Service and the choices
            you have associated with that data.
          </p>
          <p className="mb-6">
            We use your data to provide and improve the Service. By using the
            Service, you agree to the collection and use of information in
            accordance with this policy.
          </p>
          <h2 className="text-xl font-semibold mb-4">
            Information Collection and Use
          </h2>
          <p className="mb-6">
            We collect several different types of information for various
            purposes to provide and improve our Service to you.
          </p>
          <h3 className="text-lg font-semibold mb-2">
            Types of Data Collected
          </h3>
          <ul className="list-disc list-inside mb-6">
            <li>
              Personal Data: While using our Service, we may ask you to provide
              us with certain personally identifiable information that can be
              used to contact or identify you (&quot;Personal Data&quot;).
              Personally identifiable information may include but is not limited
              to:
              <ul className="list-disc list-inside ml-4">
                <li>Email address</li>
                <li>First name and last name</li>
                <li>Phone number</li>
                <li>Cookies and Usage Data</li>
              </ul>
            </li>
          </ul>
          <h2 className="text-xl font-semibold mb-4">Use of Data</h2>
          <p className="mb-6">
            EasyShares uses the collected data for various purposes:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>
              To allow you to participate in interactive features of our Service
              when you choose to do so
            </li>
            <li>To provide customer support</li>
            <li>
              To gather analysis or valuable information so that we can improve
              our Service
            </li>
            <li>To monitor the usage of our Service</li>
          </ul>
          <h2 className="text-xl font-semibold mb-4">Transfer of Data</h2>
          <p className="mb-6">
            Your information, including Personal Data, may be transferred to —
            and maintained on — computers located outside of Kenya. However,
            please note that our services are exclusively available to users
            within Kenya. If you are located outside Kenya and choose to provide
            information to us, please be aware that we will transfer the data,
            including Personal Data, to Kenya and process it there. By
            consenting to this Privacy Policy and submitting your information,
            you agree to the transfer of your data to Kenya for processing in
            accordance with this policy.
          </p>
          <p className="mb-6">
            EasyShares will take all the steps reasonably necessary to ensure
            that your data is treated securely and in accordance with this
            Privacy Policy and no transfer of your Personal Data will take place
            to an organization or a country unless there are adequate controls
            in place including the security of your data and other personal
            information.
          </p>
          <h2 className="text-xl font-semibold mb-4">Disclosure of Data</h2>
          <p className="mb-6">
            Legal Requirements: EasyShares may disclose your Personal Data in
            the good faith belief that such action is necessary to:
          </p>
          <ul className="list-disc list-inside mb-6">
            <li>To comply with a legal obligation</li>
            <li>To protect and defend the rights or property of EasyShares</li>
            <li>
              To prevent or investigate possible wrongdoing in connection with
              the Service
            </li>
            <li>
              To protect the personal safety of users of the Service or the
              public
            </li>
            <li>To protect against legal liability</li>
          </ul>
          <h2 className="text-xl font-semibold mb-4">Security of Data</h2>
          <p className="mb-6">
            The security of your data is important to us, but remember that no
            method of transmission over the Internet, or method of electronic
            storage is.
          </p>
        </div>
      </div>{" "}
      <Footer></Footer>
    </>
  );
};

export default PrivacyPolicyPage;
