import { sendEmail } from "@/actions/mailer";

const domain = process.env.NEXT_PUBLIC_URL;
const emailfromaccounts = "accounts@easyshares.pro";
const emailfromsupport = "support@easyshares.pro";
const emailfrominfo = "info@easyshares.pro";

export const sendUpdatePasswordEmail = async (email: string) => {
  const loginLink = `${domain}/auth/login`;

  const formData = {
    type: "passwordupdate-email",
    from: emailfromaccounts,
    to: email,
    subject: "Your Password was updated successfully",
    url: loginLink,
  };

  try {
    const data = await sendEmail(formData);
    return data;
  } catch (error) {
    return { success: false, message: error };
  }
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  const formData = {
    type: "passwordreset-email",
    from: emailfromaccounts,
    to: email,
    subject: "Reset your password",
    url: resetLink,
  };

  try {
    const data = await sendEmail(formData);
    return data;
  } catch (error) {
    return { success: false, message: error };
  }
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  const formData = {
    type: "verify-email",
    from: emailfromaccounts,
    to: email,
    subject: "Verify your email address",
    url: confirmLink,
  };

  try {
    const data = await sendEmail(formData);
    return data;
  } catch (error) {
    return { success: false, message: error };
  }
};

export const sendContactEmail = async (
  name: string,
  email: string,
  subject: string,
  message: string
) => {
  const formData = {
    type: "contact-email",
    from: emailfromaccounts,
    to: email,
    subject: subject,
    message: message,
    name: name,
  };

  try {
    const data = await sendEmail(formData);
    return data;
  } catch (error) {
    return { success: false, message: error };
  }
};

export const sendWelcomeEmail = async (name: string, email: string) => {
  const formData = {
    type: "welcome-email",
    name: name,
    from: emailfromaccounts,
    to: email,
    subject: "Welcome to EasyShares",
  };

  try {
    const data = await sendEmail(formData);
    return data;
  } catch (error) {
    return { success: false, message: error };
  }
};
