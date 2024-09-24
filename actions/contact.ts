"use server";
import { db } from "@/lib/prisma";

export const Contact = async (values: any) => {
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

  await db.contact.create({
    data: {
      name: values.name,
      email: values.email,
      subject: values.subject,
      message: values.message,
      status: "unreplied",
    } as any,
  });

  return {
    success: true,
    message: "Contact sent, Well respond to your email shortly!",
  };
};
