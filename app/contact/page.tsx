import React from "react";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
};

const ContactPage = () => {
  return (
    <>
      <Nav></Nav>
      <ContactForm></ContactForm>
      <Footer></Footer>
    </>
  );
};

export default ContactPage;
