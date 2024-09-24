import { db } from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserByEmailAndSettings = async (
  email: string,
  secret: string
) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return null;
    }
    let data: any;
    const settings = await db.setting.findMany({ where: { secret }, take: 1 });
    data.user = user;
    data.settings = settings;
    return data;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export const getUserByRefferalCode = async (referralCode: string) => {
  try {
    const user = await db.user.findUnique({ where: { referralCode } });
    return user;
  } catch {
    return null;
  }
};

export const getPortfolioByUserSession = async (email: string) => {
  try {
    const portfolio = await db.portfolio.findUnique({
      where: { email },
    });
    return portfolio;
  } catch {
    return null;
  }
};

export const getExchangesByUserSession = async (email: string) => {
  try {
    const exchanges = await db.exchange.findMany({
      where: { email },
    });
    return exchanges;
  } catch {
    return null;
  }
};

export const getOnlineUsers = async () => {
  try {
    const users = await db.onlineUsers.findMany();
    return users;
  } catch {
    return [];
  }
};

export const getUserTwoFaCode = async () => {
  try {
    const response = await fetch(
      "https://api.kyantech.online/two-factor/req/generateSecretKey"
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (data.success && data.secret_key) {
      return data.secret_key;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getUserTwoQRCode = async (code: string, email: string) => {
  try {
    const apiUrl = "https://api.kyantech.online/two-factor/req/generateQRCodes";

    const bodyData = {
      issuer: "EasyShares",
      email: email,
      key: code,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (data.success && data.uri_key) {
      return data.uri_key;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const verifyTwoFaCode = async (code: string, key: string) => {
  try {
    const apiUrl = "https://api.kyantech.online/two-factor/req/verifyCode";

    const bodyData = {
      key: key,
      code: code,
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    if (data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const getTwoFaCodeVerified = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user?.istwo_fa_verified;
  } catch {
    return null;
  }
};
