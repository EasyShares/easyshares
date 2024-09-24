"use server";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const ResetPassword = async (values: any) => {
  if (Object.values(values).some((value) => value === "")) {
    return { success: false, message: "Please fill in all fields." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return {
      success: false,
      message: "Email format is invalid.",
    };
  }

  const { email } = values;
  const existingUser: any = await getUserByEmail(email);

  if (!existingUser) {
    return { success: false, message: "Email does not exist!" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  const data: any = await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  if (data.success) {
    return {
      success: true,
      message: "Reset email send!",
      info: "An Email with information about how to reset your password was sent to your inbox.",
    };
  } else {
    return {
      success: false,
      message: data.message,
    };
  }
};
