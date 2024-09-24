import { db } from "./prisma";

export const generateAutoIncrementMatchID = async () => {
  try {
    const allRows = await db.exchange.findMany({
      orderBy: {
        matchID: "desc",
      },
      take: 1,
    });

    if (allRows.length === 0) {
      return 1;
    }
    const nextMatchID = allRows[0].matchID + 1;

    return nextMatchID;
  } catch (error) {
    console.error("Error generating auto-incremented matchID:", error);
    return null;
  }
};
