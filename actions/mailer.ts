"use server";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import WelcomeEmail from "@/emails/welcome";
import VerificationEmail from "@/emails/email-verification";
import ContactEmail from "@/emails/contact-email";
import PasswordResetEmail from "@/emails/password-reset";
import PassswordUpdateEmail from "@/emails/password-update";

export const sendEmail = async (values: any) => {
  const { type, name, from, to, subject, url, message } = values;
  if (Object.values(values).some((value) => value === "")) {
    return { success: false, message: "Please fill in all fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return {
      success: false,
      message: "Email format is invalid.",
    };
  }

  let emailHtml;
  if (type === "welcome-email") {
    emailHtml = render(WelcomeEmail({ name: name }));
  } else if (type === "verify-email") {
    emailHtml = render(VerificationEmail({ url: url }));
  } else if (type === "contact-email") {
    emailHtml = render(
      ContactEmail({ name: name, subject: subject, message: message })
    );
  } else if (type === "passwordreset-email") {
    emailHtml = render(PasswordResetEmail({ url: url }));
  } else if (type === "passwordupdate-email") {
    emailHtml = render(PassswordUpdateEmail({ url: url }));
  }

  const transporter = nodemailer.createTransport({
    host: "email-smtp.eu-north-1.amazonaws.com",
    port: 465,
    secure: true,
    auth: {
      user: "AKIAYS2NWO7ROUAW7NHD",
      pass: "BA8X0PuAu8UQw5TsYyxvSgkyDgDSdeBHXywSkX28qw9m",
    },
  });

  try {
    const info = await transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      html: emailHtml,
    });

    return {
      success: true,
      message: "Email sent successfully!",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send email. Please try again later.",
    };
  }
};
