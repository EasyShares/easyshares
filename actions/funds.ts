"use server";
import { getUserById } from "@/data/user";
import { db } from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { randomUUID } from "crypto";
import { getPortfolioDataByEmail } from "@/data/transaction";
const IntaSend = require('intasend-node');

export const DepositFunds = async (values: any) => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "User does not exist!" };
  }
  const existingUser = await getUserById(user.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }
  const amount = parseFloat(values.amount);
  if (isNaN(amount) || amount < 375 || amount > 100000) {
    return { success: false, message: "Invalid amount!" };
  }

  const apiUrl = "https://apicrane.tonightleads.com/api/mpesa-deposit/initiate";
  const bodyData = {
    mpesaNumber: existingUser.phone,
    amount: values.amount,
    paymentType: "CustomerPayBillOnline",
    tillOrPaybill: process.env.PAYBILL_NUMBER,
    accountNumber: process.env.ACCOUNT_NUMBER,
    callback: `${process.env.NEXT_PUBLIC_URL}api/auth/callback`,
    token: "test-token",
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error("Deposit request failed");
    }

    const data = await response.json();
    const responseCode = data.data.ResponseCode;

    if (responseCode === "0") {
      await db.cashTransaction.create({
        data: {
          amount: `${amount}`,
          email: existingUser.email,
          mpesa_code: data.data.CheckoutRequestID,
          phone: existingUser.phone,
          type: "Deposit",
          status: "Pending",
        },
      });

      return {
        success: true,
        message: "Deposit request initiated!",
        data: data,
      };
    } else {
      throw new Error(
        `Deposit request failed with response code: ${responseCode}`
      );
    }
  } catch (error) {
    console.error("Deposit error:", error);
    return { success: false, message: "An error occurred, try again!" };
  }
};

function convertPhoneNumber(phone: string) {
  const cleanedPhone = phone.replace(/\D/g, "");
  if (/^2547\d{8}|07\d{8}$/.test(cleanedPhone)) {
    return cleanedPhone.startsWith("07") ? `254${cleanedPhone.slice(1)}` : cleanedPhone;
  }
  return false;
}

export const WithdrawFunds = async (values: any) => {
  const user = await currentUser();

  if (!user) {
    return { success: false, message: "User does not exist!" };
  }

  const existingUser: any = await getUserById(user.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }

  const cash_balance: number = parseInt(existingUser.cash_balance);
  const withdrawal_amount: number = parseInt(values.w_amount);

  if (
    isNaN(withdrawal_amount) ||
    withdrawal_amount < 100 ||
    withdrawal_amount > 100000
  ) {
    return { success: false, message: "Invalid amount!" };
  }

  if (withdrawal_amount > cash_balance) {
    return { success: false, message: "Insufficient funds!" };
  }

  const withdrawalCharge = withdrawal_amount * 0.05;
  const amountToSend = withdrawal_amount - withdrawalCharge;
  const accountBalance = cash_balance - withdrawal_amount;

  function convertPhoneNumber(phone: string) {
    const cleanedPhone = phone.replace(/\D/g, "");
    const match = /^(2547\d{8}|2541\d{8}|07\d{8}|01\d{8})$/.exec(cleanedPhone);
    if (!match) {
      return false;
    }
    if (cleanedPhone.startsWith("2547") || cleanedPhone.startsWith("2541")) {
      return cleanedPhone;
    }
    if (cleanedPhone.startsWith("07") || cleanedPhone.startsWith("01")) {
      return `254${cleanedPhone.substring(1)}`;
    }
    return false;
  }

  const withdrawal_phone = convertPhoneNumber(existingUser.phone);
  if (!withdrawal_phone) {
    return { success: false, message: "Invalid phone number!" };
  }

  try {
    const auth = new IntaSend(
      process.env.INTASEND_PUBLIC_KEY,
      process.env.INTASEND_SECRET_KEY,
      false
    );

    const payouts = auth.payouts();

    const resp: any = await payouts.mpesa({
      currency: "KES",
      transactions: [
        {
          name: existingUser.fullname,
          account: withdrawal_phone,
          amount: amountToSend,
          narrative: "EasyShares Withdrawal",
        },
      ],
    });
    console.log(`Payouts response:`, resp);

    const existingPortfolio: any = await getPortfolioDataByEmail(
      existingUser.email
    );
    if (existingPortfolio) {
      await db.portfolio.update({
        where: { email: existingUser.email },
        data: {
          total_withdrawals:
            existingPortfolio.total_withdrawals + withdrawal_amount,
        },
      });
    }

    const approvedResponse = await payouts.approve(resp, false);
    const trackTransxId = resp.tracking_id;

    const statusResponse = await payouts.status({ tracking_id: trackTransxId });
    console.log("Status response:", statusResponse);

    await db.cashTransaction.create({
      data: {
        amount: `${withdrawal_amount}`,
        email: existingUser.email,
        mpesa_code: trackTransxId,
        phone: existingUser.phone,
        type: "Withdrawal",
        status: "Completed",
      },
    });

    const updateUserBalance = await db.user.update({
      where: { id: existingUser.id },
      data: { cash_balance: accountBalance },
    });

    return {
      success: true,
      message: "Withdrawal request accepted!",
    };
  } catch (error: any) {
    await db.cashTransaction.create({
      data: {
        amount: `${withdrawal_amount}`,
        email: existingUser.email,
        mpesa_code: randomUUID(),
        phone: existingUser.phone,
        type: "Withdrawal",
        status: "Cancelled",
      },
    });

    console.error("Withdrawal error:", error);

    return {
      success: false,
      message: "Withdrawal request failed, try again!",
    };
  }
};
