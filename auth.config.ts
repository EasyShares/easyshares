import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { CredentialsSignin } from "next-auth";
import { getUserByEmail } from "./data/user";

const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const formData: any = credentials;

        if (formData) {
          const { email, password } = formData;
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new CredentialsSignin("Invalid email format.");
          }

          if (password.length < 6) {
            throw new CredentialsSignin(
              "Password must be at least 6 characters long."
            );
          }
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          } else {
            throw new CredentialsSignin("Invalid credentials!");
          }
        }
        return null;
      },
    }),
  ],
};

export default authConfig;
