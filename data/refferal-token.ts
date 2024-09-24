import { db } from "@/lib/prisma";

export const getRefferalTokenByToken = async (referralCode: string) => {
  try {
    const refferalToken = await db.user.findFirst({
      where: { referralCode },
    });
    if (refferalToken) {
      return refferalToken;
    }

    return null;
  } catch {
    return null;
  }
};
