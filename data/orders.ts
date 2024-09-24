import { db } from "@/lib/prisma";

export const getAllOrderDataByAmountAndType = async (
  amount: any,
  type: string,
  status: any,
  take: any
) => {
  try {
    const orders = await db.exchange.findMany({
      where: { amount, type, status },
      take: take,
      orderBy: {
        matchID: "asc",
      },
    });
    return orders;
  } catch {
    return [];
  }
};

export const getAllOrderDataByMatchID = async (matchID: any) => {
  try {
    const orders = await db.exchange.findMany({
      where: { matchID },
    });
    return orders;
  } catch {
    return [];
  }
};
