import React from "react";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Cookie Policy",
};

const CookiePolicyPage: React.FC = () => {
  return (
    <>
      <Nav></Nav>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-8">
            Cookie Policy
          </h1>
          <p className="mb-4">Effective date: January 1, 2024</p>
          <p className="mb-4">
            This Cookie Policy explains what cookies are, how we use them, and
            your choices regarding cookies when you visit our website.
          </p>
          <h2 className="text-xl font-semibold mb-3">What are cookies?</h2>
          <p className="mb-4">
            Cookies are small pieces of text sent to your web browser by a
            website you visit. A cookie file is stored in your web browser and
            allows the Service or a third-party to recognize you and make your
            next visit easier and the Service more useful to you.
          </p>
          <h2 className="text-xl font-semibold mb-3">How we use cookies</h2>
          <p className="mb-4">
            When you use and access the Service, we may place a number of
            cookies files in your web browser.
          </p>
          <p className="mb-4">We use cookies for the following purposes:</p>
          <ul className="list-disc ml-6 mb-4">
            <li>To enable certain functions of the Service</li>
            <li>To provide analytics</li>
            <li>To store your preferences</li>
          </ul>
          <h2 className="text-xl font-semibold mb-3">
            Your choices regarding cookies
          </h2>
          <p className="mb-4">
            If you&apos;d like to delete cookies or instruct your web browser to
            delete or refuse cookies, please visit the help pages of your web
            browser.
          </p>
          <p className="mb-4">
            Please note, however, that if you delete cookies or refuse to accept
            them, you might not be able to use all of the features we offer, you
            may not be able to store your preferences, and some of our pages
            might not display properly.
          </p>
          <h2 className="text-xl font-semibold mb-3">
            Changes to our Cookie Policy
          </h2>
          <p className="mb-4">
            We may update our Cookie Policy from time to time. We will notify
            you of any changes by posting the new Cookie Policy on this page.
          </p>
          <p className="mb-4">
            We will let you know via email and/or a prominent notice on our
            Service, prior to the change becoming effective and update the
            &quot;effective date&quot; at the top of this Cookie Policy.
          </p>
          <p className="mb-4">
            You are advised to review this Cookie Policy periodically for any
            changes. Changes to this Cookie Policy are effective when they are
            posted on this page.
          </p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default CookiePolicyPage;
