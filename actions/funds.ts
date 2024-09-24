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


// export const DepositFunds = async (values: any) => {
//   const user = await currentUser();

//   if (!user) {
//     return { success: false, message: "User does not exist!" };
//   }

//   const existingUser = await getUserById(user.id);
//   if (!existingUser) {
//     return { success: false, message: "User does not exist!" };
//   }

//   const amount:any = parseFloat(values.amount);
//   if (isNaN(amount) || amount < 1 || amount > 100000) {
//     return { success: false, message: "Invalid amount! Must be between 750 and 100,000." };
//   }

//   const intasend = new IntaSend(
//     process.env.INTASEND_PUBLIC_KEY,
//     process.env.INTASEND_SECRET_KEY,
//     false
//   );

//   try {
//     const collection = intasend.collection();

//     // Initiate STK Push
//     const stkPushResp = await collection.mpesaStkPush({
//       first_name: existingUser.fullname,
//       last_name: existingUser.fullname,
//       email: existingUser.email,
//       host: "https://easyshares.pro",
//       amount,
//       phone_number: convertPhoneNumber(existingUser.phone),
//       api_ref: "EasyShares Deposit",
//     });

//     console.log("STK Push Resp:", stkPushResp);

//     const { invoice } = stkPushResp;
//     const { invoice_id, state } = invoice;

//     let initialStatus = state === "PENDING" ? "Pending" : "Cancelled";

//     // Log the initial transaction as 'Pending'
//     await db.cashTransaction.create({
//       data: {
//         amount:amount.toString(),
//         email: existingUser.email,
//         mpesa_code: invoice_id, // Using the invoice_id from the response
//         phone: existingUser.phone, // Phone number used for the transaction
//         type: "Deposit",
//         status: initialStatus, // Should be 'PENDING' initially
//       },
//     });

//     // Wait for 5 seconds before checking the transaction status
//     await new Promise((resolve) => setTimeout(resolve, 5000));

//     // Check the status of the deposit using the invoice ID
//     const statusResp = await collection.status(invoice_id);
//     console.log("Status Resp:", statusResp);

//     // Update transaction status based on the status response
//     const finalStatus = statusResp.invoice.state;
//     const mpesaReference = statusResp.invoice.mpesa_reference || null;

//     // Determine final status
//     let transactionStatus;
//     if (finalStatus === "COMPLETED") {
//       transactionStatus = "Completed";
//     } else if (finalStatus === "FAILED") {
//       transactionStatus = "Cancelled";
//     } else {
//       transactionStatus = "Pending"; // In case it's still pending
//     }

//     // Update the transaction in the database with the final status
//     await db.cashTransaction.update({
//       where: { mpesa_code: invoice_id },
//       data: {
//         status: transactionStatus, // Update status (e.g., 'COMPLETED', 'FAILED')
//       },
//     });

//     // Return based on final transaction status
//     if (transactionStatus === "Completed") {
//       return {
//         success: true,
//         message: "Deposit successful!",
//       };
//     } else if (transactionStatus === "Cancelled") {
//       return {
//         success: false,
//         message: "Deposit failed. Please try again.",
//       };
//     } else {
//       return {
//         success: false,
//         message: "Deposit is still pending. Please check again later.",
//       };
//     }
//   } catch (error) {
//     console.error("Deposit error:", error);

//     // Log a cancelled transaction in case of error
//     await db.cashTransaction.create({
//       data: {
//         amount: `${amount}`,
//         email: existingUser.email,
//         mpesa_code: randomUUID(), // Generate UUID if the transaction fails
//         phone: existingUser.phone,
//         type: "Deposit",
//         status: "Cancelled",
//       },
//     });

//     return {
//       success: false,
//       message: "An error occurred during the deposit, please try again!",
//     };
//   }
// };

// Helper to clean/convert phone numbers


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
