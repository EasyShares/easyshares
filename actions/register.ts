"use server";
import {
  getUserByEmail,
  getUserTwoFaCode,
  getUserTwoQRCode,
} from "@/data/user";
import { sendVerificationEmail, sendWelcomeEmail } from "@/lib/mail";
import { db } from "@/lib/prisma";
import { generateRefferalToken, generateVerificationToken } from "@/lib/tokens";
import bcrypt from "bcryptjs";

export const Register = async (values: any) => {
  if (Object.values(values).some((value) => value === "")) {
    return { success: false, message: "Please fill in all fields." };
  }

  const fullNameParts = values.fullname.trim().split(" ");
  if (fullNameParts.length !== 2) {
    return {
      success: false,
      message: "Full Name should contain exactly two names.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return {
      success: false,
      message: "Email format is invalid.",
    };
  }

  if (!/^(2547\d{8}|2541\d{8}|07\d{8}|01\d{8})$/.test(values.phone)) {
    return {
      success: false,
      message: "Phone number format is invalid.",
    };
  }

  if (values.password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters long.",
    };
  }

  if (values.uplineCode.length != 6 || values.uplineCode == "") {
    values.uplineCode = "null";
  }

  const { email, phone, password, fullname, uplineCode } = values;
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUserByEmail = await getUserByEmail(email);
  const referralCode = await generateRefferalToken();
  const myTwoFaCode = await getUserTwoFaCode();
  if (!myTwoFaCode) {
    return { success: false, message: "An error occured, try again!" };
  }
  const myTwoFaQRCode = await getUserTwoQRCode(myTwoFaCode, email);
  if (!myTwoFaQRCode) {
    return { success: false, message: "An error occured, try again!" };
  }
  if (existingUserByEmail) {
    return {
      success: false,
      message: "User with this email already exists.",
    };
  }

  try {
    await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
        fullname: fullname,
        phone: phone,
        cash_balance: 0,
        shares_balance: 0,
        emailNotifications: "on",
        smsNotifications: "on",
        two_fa: "off",
        two_fa_Code: myTwoFaCode,
        two_fa_QRCode: myTwoFaQRCode,
        accepted_terms: "yes",
        referralCode: referralCode,
        uplineCode: uplineCode,
      } as any,
    });

    await db.portfolio.create({
      data: {
        email: email,
        phone: phone,
        total_shares_bought: 0,
        total_shares_sold: 0,
        total_deposits: 0,
        total_withdrawals: 0,
        total_profit: 0,
        total_affiliates_profit: 0,
      } as any,
    });

    await db.affiliate.create({
      data: {
        email: email,
        uplineCode: uplineCode,
        status: "Unverified",
      } as any,
    });

    const verificationToken = await generateVerificationToken(email);
    const data = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    const welcomeEmail = await sendWelcomeEmail(fullname, email);

    const url = `/auth/verify-email?email=${email}`;
    if (data.success) {
      return {
        success: true,
        message: "Registration successful, Confirmation email send!",
        url: url,
      };
    }
  } catch (error) {
    return { success: false, message: "An error occured, try again!" };
  }
};
