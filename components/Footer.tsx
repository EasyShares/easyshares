"use client";
import React from "react";
import Link from "next/link";
import useSettings from "@/hooks/useSettings";
import FaceBookIcon from "./svg/FaceBookIcon";
import YoutubeIcon from "./svg/YoutubeIcon";
import TwitterIcon from "./svg/TwitterIcon";
import TiktokIcon from "./svg/TiktokIcon";

const Footer = () => {
  const settings = useSettings();
  return (
    <>
      <footer className="footer bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-10">
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link href={"/terms"} className="link link-hover">
            Terms of use
          </Link>
          <Link href={"/privacy-policy"} className="link link-hover">
            Privacy policy
          </Link>
          <Link href={"/cookie-policy"} className="link link-hover">
            Cookie policy
          </Link>
          {/* <Link href={"/licence"} className="link link-hover">
            Licence
          </Link> */}
        </nav>

        <nav>
          <h6 className="footer-title">Company</h6>
          <Link href={"/about"} className="link link-hover">
            About us
          </Link>
          <Link href={"/contact"} className="link link-hover">
            Contact
          </Link>
          <Link href={"/faqs"} className="link link-hover">
            Faq&apos;s
          </Link>
        </nav>

        <nav>
          <h6 className="footer-title">Services</h6>
          <Link href={"/ads"} className="link link-hover">
            Advertisement
          </Link>
        </nav>

        <footer className="footer text-white">
          <aside className="items-center grid-flow-col">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            <div className="flex flex-col gap-3">
              <p className="text-white">
                Copyright &copy; {new Date().getFullYear()}. EasyShares
              </p>
              <Link
                className="text-white"
                href="https://kyantech.store?source=easyshares"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p>Powered by KyanTech</p>
              </Link>
            </div>
          </aside>
          <nav className="md:place-self-center md:justify-self-end">
            <div className="grid grid-flow-col gap-4 mt-10 lg:mt-0">
              <Link href={settings[0]?.twitter || "/"}>
                <TwitterIcon />
              </Link>
              <Link href={settings[0]?.youtube || "/"}>
                <YoutubeIcon />
              </Link>
              <Link href={settings[0]?.facebook || "/"}>
                <FaceBookIcon />
              </Link>
              <Link href={settings[0]?.tiktok || "/"}>
                <TiktokIcon />
              </Link>
            </div>
          </nav>
        </footer>
      </footer>
      <footer className="bg-gray-800 text-white text-sm font-semibold p-10">
        EasyShares provides a platform for buying and selling shares, offering
        features such as Lower Cost Shares and Customized ROI. While we aim for
        accuracy and efficiency, we cannot guarantee the completeness or
        reliability of the information provided. Investing in shares carries
        risks, and users should assess their own financial situation and risk
        tolerance before making decisions. EasyShares does not provide
        investment advice, and users are solely responsible for their investment
        choices. Transactions may be subject to delays or disruptions, and past
        performance is not indicative of future results. By using EasyShares,
        users acknowledge these risks and agree to conduct their own research
        before investing.
      </footer>
    </>
  );
};

export default Footer;
