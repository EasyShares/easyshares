import { db } from "@/lib/prisma";

export const getAffiliatesDataByRefferalCode = async (uplineCode: string) => {
  try {
    const affiliates = await db.affiliate.findMany({
      where: { uplineCode: uplineCode },
    });
    return affiliates;
  } catch {
    return null;
  }
};

export const getUplineDetailsByReferralCode = async (uplineCode: string) => {
  try {
    const user = await db.user.findFirst({
      where: { referralCode: uplineCode },
    });
    return user;
  } catch {
    return null;
  }
};

export const getAffiliatesDataByEmail = async (uplineCode: string) => {
  try {
    const affiliates = await db.user.findMany({
      where: { uplineCode: uplineCode },
    });
    return affiliates;
  } catch {
    return null;
  }
};
