import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: any;
  role: UserRole;
  fullname: any;
  email: any;
  cash_balance: Int;
  shares_balance: Int;
  emailVerified: any;
  emailNotifications: any;
  smsNotifications: any;
  two_fa: any;
  two_fa_Code: any;
  two_fa_QRCode: any;
  phone: any;
  referralCode: any;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
