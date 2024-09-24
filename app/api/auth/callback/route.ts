import { getPortfolioDataByEmail } from "@/data/transaction";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { ResultCode, CheckoutRequestID } = data.Body.stkCallback;

  if (ResultCode == 0) {
    const { CallbackMetadata } = data.Body.stkCallback;
    const amount = parseInt(CallbackMetadata.Item[0]["Value"]);
    const mpesa_code = CallbackMetadata.Item[1]["Value"];

    const res = await db.cashTransaction.findUnique({
      where: { mpesa_code: CheckoutRequestID },
    });

    if (res === null) return;

    const user = await db.user.findUnique({
      where: { email: res.email },
    });

    if (user === null) return;

    await db.cashTransaction.update({
      where: { mpesa_code: CheckoutRequestID },
      data: {
        mpesa_code: mpesa_code,
        status: "Completed",
      },
    });

    await db.user.update({
      where: { email: res.email },
      data: {
        cash_balance: user.cash_balance + amount,
      },
    });

    const existingportfolio: any = await getPortfolioDataByEmail(user.email);
    if (existingportfolio) {
      await db.portfolio.update({
        where: { email: user.email },
        data: {
          total_deposits: existingportfolio.total_deposits + amount,
        } as any,
      });
    }
  } else {
    await db.cashTransaction.update({
      where: { mpesa_code: CheckoutRequestID },
      data: {
        status: "Cancelled",
      },
    });
  }

  return NextResponse.json({ status: 200 });
}
