"use server";
import { getUserById } from "@/data/user";
import { db } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import bcrypt from "bcryptjs";

export const UpdateUserInfo = async (values: any) => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "User does not exist!" };
  }
  const existingUser = await getUserById(user.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }
  if (Object.values(values).some((value) => value === "")) {
    return { success: false, message: "Fill in all fields!" };
  }
  const fullnameParts = values.fullname.trim().split(" ");
  if (fullnameParts.length !== 2) {
    return {
      success: false,
      message: "Full Name should contain exactly two names!",
    };
  }
  if (!/^(2547\d{8}|2541\d{8}|07\d{8}|01\d{8})$/.test(values.phone)) {
    return {
      success: false,
      message: "Phone number format is invalid.",
    };
  }
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      ...values,
    },
  });
  return { success: true, message: "Profile information Updated!" };
};

export const DeleteAccount = async (values: any) => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "User does not exist!" };
  }
  const existingUser = await getUserById(user.id);
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

export const UpdateUserPassword = async (values: any) => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "User does not exist!" };
  }
  const existingUser = await getUserById(user.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }
  if (Object.values(values).some((value) => value === "")) {
    return { success: false, message: "Please fill in all fields!" };
  }
  if (values.newPassword.length < 6) {
    return {
      success: false,
      message: "New password must be at least 6 characters long!",
    };
  }
  const passwordsMatch = await bcrypt.compare(
    values.currentPassword,
    existingUser.password
  );
  if (!passwordsMatch) {
    return { success: false, message: "Current password is wrong!" };
  }
  if (values.newPassword !== values.confirmPassword) {
    return {
      success: false,
      message: "New password and Confirm password must match!",
    };
  }
  const passwordsRepeatMatch = await bcrypt.compare(
    values.newPassword,
    existingUser.password
  );
  if (passwordsRepeatMatch) {
    return {
      success: false,
      message: "New password cannot be same as Current Password!",
    };
  }
  const hashedPassword = await bcrypt.hash(values.newPassword, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });
  return { success: true, message: "Password Updated!" };
};

export const NotificationSettings = async (values: any) => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "User does not exist!" };
  }
  const existingUser = await getUserById(user.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }

  if (Object.values(values).some((value) => value === "")) {
    return { success: false, message: "Invalid params!" };
  }
  if (
    values.smsNotifications !== "on" &&
    values.smsNotifications !== "off" &&
    values.emailNotifications !== "on" &&
    values.emailNotifications !== "off"
  ) {
    return { success: false, message: "Invalid params!" };
  }
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      ...values,
    },
  });
  return { success: true, message: "Notification Settings Updated!" };
};

export const TwoFaSettings = async (values: any) => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "User does not exist!" };
  }
  const existingUser = await getUserById(user.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }
  if (Object.values(values).some((value) => value === "")) {
    return { success: false, message: "Invalid params!" };
  }
  if (values.two_fa !== "on" && values.two_fa !== "off") {
    return { success: false, message: "Invalid params!" };
  }
  await db.user.update({
    where: { id: existingUser.id },
    data: {
      ...values,
    },
  });
  return {
    success: true,
    message: "Two-Factor Authentication Settings Updated!",
  };
};
