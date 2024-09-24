"use server";
import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/prisma";
import { sendUpdatePasswordEmail } from "@/lib/mail";

export const NewPassword = async (values: any, token?: string | null) => {
  if (!token) {
    return { success: false, message: "Missing token!" };
  }

  const validatedFields = values;

  if (!validatedFields.password) {
    return { success: false, message: "Invalid fields!" };
  }

  const { password } = validatedFields;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { success: false, message: "Invalid token!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { success: false, message: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { success: false, message: "Email does not exist!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  const data: any = await sendUpdatePasswordEmail(existingToken.email);
  return { success: true, message: "Password updated!" };
};
