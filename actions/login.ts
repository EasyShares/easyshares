"use server";
import { signIn } from "@/auth";
import { getUserByEmail, verifyTwoFaCode } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { db } from "@/lib/prisma";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError, CredentialsSignin } from "next-auth";

export const Login = async (values: any, callbackUrl?: string) => {
  if (values.email === "" || values.password === "") {
    return {
      error: true,
      message: "Please fill in all required fields.",
    };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    return {
      error: true,
      message: "Email format is invalid.",
    };
  }

  if (values.password.length < 6) {
    return {
      error: true,
      message: "Password must be at least 6 characters long.",
    };
  }

  const { email, password } = values;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: true, message: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    const data = await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    if (data.success) {
      return {
        success: true,
        message: "Confirmation email send!",
      };
    } else {
      return {
        error: true,
        message: "Error sending Confirmation email!",
      };
    }
  }

  if (existingUser?.two_fa === "on") {
    if (values.code !== "") {
      const verifyCode = await verifyTwoFaCode(
        values.code,
        existingUser.two_fa_Code
      );
      if (!verifyCode) {
        return { error: true, message: "Invalid code!" };
      }
      const verifyCodeInDB = await db.user.update({
        where: { id: existingUser.id },
        data: {
          istwo_fa_verified: true,
        },
      });
    } else {
      return {
        message: "Enter the Code on your Authenticator App to continue",
        twofactor: true,
      };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          if (error instanceof CredentialsSignin) {
            return { error: true, message: "Invalid credentials!" };
          }
        default:
          return { error: true, message: "Something went wrong!" };
      }
    }

    throw error;
  }
};
