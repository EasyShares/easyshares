"use server";
import { getCompetitionByUrl } from "@/data/competitions";
import { getAllSettings } from "@/data/content-manager";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentRole } from "@/lib/auth";
import { generateCompetitionUrl } from "@/lib/generators";
import { sendContactEmail, sendVerificationEmail } from "@/lib/mail";
import { db } from "@/lib/prisma";
import { generateRefferalToken, generateVerificationToken } from "@/lib/tokens";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

export const ReplyContactEmail = async (values: any) => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { success: false, message: "Unauthorized Action!" };
  }

  if (Object.values(values).some((value) => value === "")) {
    return { success: false, message: "Please fill in all fields." };
  }

  const fullNameParts = values.name.trim().split(" ");
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

  await db.contact.update({
    where: { id: values.id },
    data: {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
      status: "replied",
    } as any,
  });

  const data = await sendContactEmail(
    values.name,
    values.email,
    values.subject,
    values.message
  );

  if (data.success) {
    return {
      success: true,
      message: "Response send successful!",
    };
  }
};

export const EditUserData = async (values: any) => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { success: false, message: "Unauthorized Action!" };
  }

  if (Object.values(values).some((value) => value === "")) {
    return { success: false, message: "Please fill in all fields." };
  }

  const fullNameParts = values.fullName.trim().split(" ");
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

  await db.user.update({
    where: { email: values.email },
    data: {
      fullname: values.fullName,
      email: values.email,
      phone: values.phone,
      uplineCode: values.refferer,
      role: values.role,
      cash_balance: Math.floor(values.cash_balance),
      shares_balance: Math.floor(values.shares_balance),
    } as any,
  });

  return {
    success: true,
    message: "User details Updated!",
  };
};

export const DeleteUserAccount = async (values: any) => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { success: false, message: "Unauthorized Action!" };
  }
  const existingUser = await getUserById(values.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }
  if (Object.values(values).some((value) => value === "")) {
    return { success: false, message: "Invalid Credentials!" };
  }
  if (existingUser.email !== values.email) {
    return { success: false, message: "Invalid Credentials!" };
  }
  try {
    await db.portfolio.delete({
      where: { email: existingUser.email },
    });
    await db.cashTransaction.deleteMany({
      where: { email: existingUser.email },
    });
    await db.exchange.deleteMany({
      where: { email: existingUser.email },
    });
    await db.participant.deleteMany({
      where: { email: existingUser.email },
    });
    await db.contact.deleteMany({
      where: { email: existingUser.email },
    });
    await db.user.delete({
      where: { email: existingUser.email },
    });

    return { success: true, message: "Account deleted!" };
  } catch (error) {
    return { success: false, message: "Failed to delete user account." };
  }
};

export const RegisterUser = async (values: any) => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { success: false, message: "Unauthorized Action!" };
  }

  if (Object.values(values).some((value) => value === "")) {
    return { success: false, message: "Please fill in all fields." };
  }

  const fullNameParts = values.fullName.trim().split(" ");
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

  const { email, phone, password, fullName, uplineCode } = values;
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUserByEmail = await getUserByEmail(email);
  const referralCode = await generateRefferalToken();

  if (existingUserByEmail) {
    return {
      success: false,
      message: "User with this email already exists.",
    };
  }

  await db.user.create({
    data: {
      email: email,
      password: hashedPassword,
      fullname: fullName,
      phone: phone,
      cash_balance: 0,
      shares_balance: 0,
      emailNotifications: "on",
      smsNotifications: "on",
      two_fa: "off",
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

  if (data.success) {
    return {
      success: true,
      message: "Registration successful, Confirmation email send!",
    };
  }
};

export const CreateCompetition = async (values: any) => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { success: false, message: "Unauthorized Action!" };
  }
  if (Object.values(values).some((value) => value === "")) {
    return { success: false, message: "Please fill in all fields." };
  }
  const competitionUrl = await generateCompetitionUrl(values.name);
  const existingUrl = await getCompetitionByUrl(competitionUrl);
  if (existingUrl) {
    return { success: false, message: "Choose a different Competition Name!" };
  }
  function convertToTimeStamp(time: any) {
    const timestamp = new Date(time).toISOString();
    return timestamp;
  }

  try {
    await db.competition.create({
      data: {
        name: values.name,
        month: values.month,
        startAt: convertToTimeStamp(values.startAt),
        endAt: convertToTimeStamp(values.endAt),
        status: values.status,
        participants: 0,
        url: competitionUrl,
        isUpdated: false,
        winner: "_",
      } as any,
    });

    return {
      success: true,
      message: "Competition created successful!",
    };
  } catch (error) {
    return { success: false, message: "An error occured, try again!" };
  }
};

export const CreateAd = async (values: any) => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { success: false, message: "Unauthorized Action!" };
  }
  if (values.name === "" || values.cname === "" || values.description === "") {
    return {
      success: false,
      message: "Ad name, company name and ad description are required fields.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.cemail)) {
    return { success: false, message: "Email format is invalid." };
  }

  if (!/^(banner|pop-up)$/.test(values.type)) {
    return { success: false, message: "Ad type is invalid." };
  }

  if (!/^(active|inactive)$/.test(values.status)) {
    return { success: false, message: "Ad type is invalid." };
  }

  if (values.url !== "") {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(values.url)) {
      return { success: false, message: "Ad URL format is invalid." };
    }
  }

  try {
    await db.ad.create({
      data: {
        name: values.name,
        description: values.description,
        url: values.url,
        code: values.code,
        cname: values.cname,
        cemail: values.cemail,
        type: values.type,
        status: values.status,
      } as any,
    });

    return {
      success: true,
      message: "Ad created successful!",
    };
  } catch (error) {
    return { success: false, message: "An error occured, try again!" };
  }
};

export const DeleteAdData = async (values: any) => {
  const role = await currentRole();
  if (role !== UserRole.ADMIN) {
    return { success: false, message: "Unauthorized Action!" };
  }
  if (Object.values(values).some((value) => value === "")) {
    return { success: false, message: "Invalid Credentials!" };
  }
  try {
    await db.ad.delete({
      where: { id: values.id },
    });
    return { success: true, message: "Ad deleted!" };
  } catch (error) {
    return { success: false, message: "An error occured, try again!" };
  }
};

export const UpdateAd = async (values: any) => {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { success: false, message: "Unauthorized Action!" };
  }
  if (values.name === "" || values.cname === "" || values.description === "") {
    return {
      success: false,
      message: "Ad name, company name and ad description are required fields.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.cemail)) {
    return { success: false, message: "Email format is invalid." };
  }

  if (!/^(banner|pop-up)$/.test(values.type)) {
    return { success: false, message: "Ad type is invalid." };
  }

  if (!/^(active|inactive)$/.test(values.status)) {
    return { success: false, message: "Ad type is invalid." };
  }

  if (values.url !== "") {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!urlPattern.test(values.url)) {
      return { success: false, message: "Ad URL format is invalid." };
    }
  }

  try {
    await db.ad.update({
      where: { id: values.id },
      data: {
        name: values.name,
        description: values.description,
        url: values.url,
        code: values.code,
        cname: values.cname,
        cemail: values.cemail,
        type: values.type,
        status: values.status,
      } as any,
    });

    return {
      success: true,
      message: "Ad updated successful!",
    };
  } catch (error) {
    return { success: false, message: "An error occured, try again!" };
  }
};

export const UpdateSettingsData = async (values: any) => {
  // const role = await currentRole();
  // if (role !== UserRole.ADMIN) {
  //   return { success: false, message: "Unauthorized Action!" };
  // }

  try {
    const existingSettings = await getAllSettings();
    if (existingSettings?.length === 0) {
      await db.setting.create({
        data: {
          websitename: "EasyShares",
          twitter: "",
          youtube: "",
          tiktok: "",
          facebook: "",
          status: "live",
          commingSoonAt: "",
          disclaimer: "",
          secret: "",
        },
      });
    } else {
      await db.setting.update({
        where: { id: values.id },
        data: {
          ...values,
        },
      });
    }

    return {
      success: true,
      message: "Settings updated!",
    };
  } catch (error) {
    return { success: false, message: "An error occured, try again!" };
  }
};

export const fetchSettings = async () => {
  const settings = await getAllSettings();
  if (settings) {
    return {
      success: true,
      message: "Data Fetched!",
      settings: settings,
    };
  } else {
    return {
      success: false,
      message: "Data not Fetched!",
      settings: [],
    };
  }
};
