import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/prisma";
import authConfig from "@/auth.config";
import { getOnlineUsers, getTwoFaCodeVerified, getUserById } from "./data/user";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      const userid: any = user.id;
      const existingUser = await getUserById(userid);
      if (!existingUser?.emailVerified) return false;

      if (existingUser?.two_fa === "on") {
        const isTwoFaVerified = await getTwoFaCodeVerified(existingUser.id);
        if (!isTwoFaVerified) {
          return false;
        }
        const verifyCodeInDB = await db.user.update({
          where: { id: existingUser.id },
          data: {
            istwo_fa_verified: false,
          },
        });
      }

      const existingOnlineUsers: any = await getOnlineUsers();
      if (existingOnlineUsers.length === 0) {
        await db.onlineUsers.create({
          data: {
            users: 1,
          },
        });
      } else {
        const id = existingOnlineUsers[0].id;
        const users = existingOnlineUsers[0].users;
        await db.onlineUsers.update({
          where: { id: id },
          data: {
            users: users + 1,
          },
        });
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.fullname = token.fullname;
        session.user.email = token.email;
        session.user.cash_balance = token.cash_balance;
        session.user.shares_balance = token.shares_balance;
        session.user.emailVerified = token.emailVerified;
        session.user.emailNotifications = token.emailNotifications;
        session.user.smsNotifications = token.smsNotifications;
        session.user.two_fa = token.two_fa;
        session.user.two_fa_Code = token.two_fa_Code;
        session.user.two_fa_QRCode = token.two_fa_QRCode;
        session.user.phone = token.phone;
        session.user.referralCode = token.referralCode;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      token.IsOAuth = !!existingUser;
      token.role = existingUser.role;
      token.fullname = existingUser.fullname;
      token.email = existingUser.email;
      token.cash_balance = existingUser.cash_balance;
      token.shares_balance = existingUser.shares_balance;
      token.emailNotifications = existingUser.emailNotifications;
      token.emailVerified = existingUser.emailVerified;
      token.phone = existingUser.phone;
      token.smsNotifications = existingUser.smsNotifications;
      token.role = existingUser.role;
      token.two_fa = existingUser.two_fa;
      token.referralCode = existingUser.referralCode;
      token.two_fa_Code = existingUser.two_fa_Code;
      token.two_fa_QRCode = existingUser.two_fa_QRCode;
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
