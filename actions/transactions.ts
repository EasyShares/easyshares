"use server";
import { getUserById } from "@/data/user";
import {
  getCashTransactionDataByEmail,
  getExchangeDataByEmail,
  getExchangesData,
  getPortfolioDataByEmail,
} from "@/data/transaction";
import { currentUser } from "@/lib/auth";
import { getAffiliatesDataByEmail } from "@/data/affiliates";

export const cashTransactions = async () => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "User does not exist!" };
  }
  const existingUser = await getUserById(user.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }
  const transactions = await getCashTransactionDataByEmail(existingUser.email);
  if (transactions) {
    return {
      success: true,
      message: "Data Fetched!",
      cash_transactions: transactions,
    };
  }
};

export const portFolioTransactions = async () => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "User does not exist!" };
  }
  const existingUser = await getUserById(user.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }
  const portfolio = await getPortfolioDataByEmail(existingUser.email);
  if (portfolio) {
    return {
      success: true,
      message: "Data Fetched!",
      portfolio: portfolio,
    };
  }
};

export const getaAffiliates = async () => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "User does not exist!" };
  }
  const existingUser = await getUserById(user.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }
  const affiliates = await getAffiliatesDataByEmail(existingUser.referralCode);
  if (affiliates) {
    return {
      success: true,
      message: "Data Fetched!",
      affiliates: affiliates,
    };
  }
};

export const SharesExchages = async () => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "User does not exist!" };
  }
  const existingUser = await getUserById(user.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }
  const exchanges = await getExchangeDataByEmail(existingUser.email);
  if (exchanges) {
    return {
      success: true,
      message: "Data Fetched!",
      exchanges: exchanges,
    };
  }
};

export const LiveExchages = async () => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "User does not exist!" };
  }
  const existingUser = await getUserById(user.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }
  const exchanges = await getExchangesData();
  if (exchanges) {
    return {
      success: true,
      message: "Data Fetched!",
      exchanges: exchanges,
    };
  }
};
