import { db } from "@/lib/prisma";

export const getAllSettings = async () => {
  try {
    const settings = await db.setting.findMany();
    return settings;
  } catch (error) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany();
    return users;
  } catch {
    return null;
  }
};

export const getAllAdmins = async () => {
  try {
    const users = await db.user.findMany({
      where: { role: "ADMIN" },
    });
    return users;
  } catch {
    return null;
  }
};

export const getAllCashAssets = async () => {
  try {
    const assets = await db.cashTransaction.findMany();
    return assets;
  } catch {
    return null;
  }
};
export const getAllDepositAssets = async () => {
  try {
    const assets = await db.cashTransaction.findMany({
      where: { type: "deposit" },
    });
    return assets;
  } catch {
    return null;
  }
};

export const getAllWithdrawalAssets = async () => {
  try {
    const assets = await db.cashTransaction.findMany({
      where: { type: "withrawal" },
    });
    return assets;
  } catch {
    return null;
  }
};

export const getAllExchangeAssets = async () => {
  try {
    const assets = await db.exchange.findMany();
    return assets;
  } catch {
    return null;
  }
};

export const getAllBuyOders = async () => {
  try {
    const assets = await db.exchange.findMany({
      where: { type: "buy" },
    });
    return assets;
  } catch {
    return null;
  }
};

export const getAllSellOders = async () => {
  try {
    const assets = await db.exchange.findMany({
      where: { type: "sell" },
    });
    return assets;
  } catch {
    return null;
  }
};

export const getAllContacts = async () => {
  try {
    const contacts = await db.contact.findMany();
    return contacts;
  } catch {
    return null;
  }
};

export const getAllAds = async () => {
  try {
    const ads = await db.ad.findMany();
    return ads;
  } catch {
    return null;
  }
};

export const getAllSettingsBySecret = async (secret: string) => {
  try {
    const settings = await db.setting.findFirst({
      where: { secret: secret },
    });
    return settings;
  } catch (error) {
    return null;
  }
};
