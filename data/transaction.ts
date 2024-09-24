import { db } from "@/lib/prisma";

export const getCashTransactionDataByEmail = async (email: string) => {
  try {
    const transactions = await db.cashTransaction.findMany({
      where: { email },
    });
    return transactions;
  } catch {
    return [];
  }
};
export const getPortfolioDataByEmail = async (email: string) => {
  try {
    const portfolio = await db.portfolio.findUnique({
      where: { email },
    });
    return portfolio;
  } catch {
    return [];
  }
};
export const getExchangeDataByEmail = async (email: string) => {
  try {
    const exchanges = await db.exchange.findMany({
      where: { email },
    });
    return exchanges;
  } catch {
    return [];
  }
};

export const getExchangesData = async () => {
  try {
    const exchanges = await db.exchange.findMany({
      take: 30,
      orderBy: {
        id: "desc",
      },
    });
    return exchanges;
  } catch {
    return [];
  }
};

export const getPopularSharesBought = async () => {
  try {
    const popularshares = await db.popularSharesBought.findMany({
      orderBy: {
        buyers: "desc",
      },
    });
    return popularshares;
  } catch {
    return [];
  }
};

export const getPopularSharesSold = async () => {
  try {
    const popularshares = await db.popularSharesSold.findMany({
      orderBy: {
        sellers: "desc",
      },
    });
    return popularshares;
  } catch {
    return [];
  }
};

export const getpopularSharesBoughtBySharesAmount = async (name: string) => {
  try {
    const popularshares = await db.popularSharesBought.findFirst({
      where: { name },
    });
    return popularshares;
  } catch {
    return null;
  }
};

export const getTotalpopularSharesBought = async () => {
  try {
    const popularshares = await db.popularSharesBought.findMany();
    return popularshares;
  } catch {
    return null;
  }
};

export const getpopularSharesSoldBySharesAmount = async (name: string) => {
  try {
    const popularshares = await db.popularSharesSold.findFirst({
      where: { name },
    });
    return popularshares;
  } catch {
    return null;
  }
};

export const getTotalOrdersByTypeAndAMount = async (
  type: string,
  amount: any
) => {
  try {
    const orders = await db.exchange.findMany({
      where: { type, amount },
    });
    return orders;
  } catch {
    return null;
  }
};

export const getTotalOrdersByType = async (type: string) => {
  try {
    const orders = await db.exchange.findMany({
      where: { type },
    });
    return orders;
  } catch {
    return null;
  }
};

export const getBuyPrices = async () => {
  const buyPrices = [375,750, 1500, 2250, 3000, 3750, 4500, 5250, 6000, 6750, 7500];
  return buyPrices;
};

export const getSellrices = async () => {
  const sellPrices = [
    250,500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
  ];
  return sellPrices;
};

export const getCashTransactionsByEmail = async (email: string) => {
  try {
    const transactions = await db.cashTransaction.findMany({
      where: { email },
      orderBy: {
        id: "desc",
      },
    });
    return transactions;
  } catch {
    return null;
  }
};

export const getExchangeTransactionsByEmail = async (email: string) => {
  try {
    const transactions = await db.exchange.findMany({
      where: { email },
    });
    return transactions;
  } catch {
    return null;
  }
};
