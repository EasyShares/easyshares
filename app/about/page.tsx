import React from "react";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "About",
};

const AboutPage: React.FC = () => {
  return (
    <>
      <Nav></Nav>
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-semibold mb-8">
            About EasyShares
          </h1>
          <p className="text-lg mb-6">
            EasyShares is an online platform designed exclusively for Kenyan
            users, founded in 2024 with the official domain{" "}
            <a href="https://easyshares.pro" className="text-blue-500">
              https://easyshares.pro
            </a>
            . Our primary aim is to empower users to unlock their financial
            potential and generate wealth effortlessly.
          </p>
          <p className="text-lg mb-6">
            By providing a user-friendly interface and innovative features,
            EasyShares facilitates seamless shares exchange experiences,
            enabling individuals to invest wisely and maximize their earnings.
          </p>
          <p className="text-lg mb-6">
            Our platform is dedicated to fostering financial inclusivity and
            democratizing investment opportunities, ensuring that all users,
            regardless of their background or expertise, can participate in the
            shares market with confidence.
          </p>
          <p className="text-lg mb-6">
            At EasyShares, we are committed to promoting financial literacy and
            empowerment, empowering Kenyan users to achieve their financial
            goals and secure a prosperous future.
          </p>
          <p className="text-lg mb-6">
            Join EasyShares today and embark on a journey towards financial
            freedom!
          </p>
        </div>
      </div>{" "}
      <Footer></Footer>
    </>
  );
};

export default AboutPage;
