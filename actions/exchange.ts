"use server";
import { getUplineDetailsByReferralCode } from "@/data/affiliates";
import { getAllOrderDataByAmountAndType } from "@/data/orders";
import {
  getpopularSharesBoughtBySharesAmount,
  getpopularSharesSoldBySharesAmount,
  getPortfolioDataByEmail,
  getTotalOrdersByType,
  getTotalOrdersByTypeAndAMount,
} from "@/data/transaction";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateAutoIncrementMatchID } from "@/lib/matchID";
import { db } from "@/lib/prisma";

export const exchangePrices = async () => {
  const buyPrices = [375, 750, 1500, 2250, 3000, 3750, 4500, 5250, 6000, 6750, 7500];
  const sellPrices = [
    250, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
  ];

  return { buyPrices: buyPrices, sellPrices: sellPrices };
};

const updateSellerModel = async (
  seller_user_info: any,
  seller_id: any,
  shares_order_amount: any,
  seller_amount: any
) => {
  let company_email = "easyshares254@gmail.com";
  let companyCommission = 0.05; // 5% company commission
  let uplineCommission = 0.05;  // 5% upline commission
  let sellerProfit: number;
  let sellerCashBalanceProfit;
  let uplineCashBalanceProfit;
  let companyCashBalanceProfit;
  let existingUpline: any;

  // Mark seller's order as sold
  const UpdateSellerOrder = await db.exchange.update({
    where: { id: seller_id },
    data: {
      status: "sold",
    },
  });

  // Fetch upline details if available
  existingUpline = await getUplineDetailsByReferralCode(
    seller_user_info.uplineCode
  );

  // If seller has a valid upline
  if (seller_user_info.uplineCode !== "null" && existingUpline) {
    sellerProfit = Math.floor(shares_order_amount - seller_amount)
    uplineCashBalanceProfit = Math.floor(sellerProfit * uplineCommission); // 5% to upline
    companyCashBalanceProfit = Math.floor(sellerProfit * companyCommission); // 5% to company
    let totalCommission = uplineCashBalanceProfit + companyCashBalanceProfit;
    sellerCashBalanceProfit = Math.floor(
      sellerProfit - totalCommission
    ); // Seller gets the rest (90%)
  } else {
    // If no valid upline, increase company commission to 10%
    uplineCashBalanceProfit = 0;
    companyCommission = 0.1;
    sellerProfit = Math.floor(shares_order_amount - seller_amount)
    companyCashBalanceProfit = Math.floor(sellerProfit * companyCommission); // 10% to company
    sellerCashBalanceProfit = Math.floor(
      sellerProfit - companyCashBalanceProfit
    ); // Seller gets 90%
  }

  // Update seller's cash balance
  await db.user.update({
    where: { email: seller_user_info.email },
    data: {
      cash_balance: seller_user_info.cash_balance + sellerCashBalanceProfit,
    },
  });

  // Update upline's cash balance if upline exists
  if (existingUpline) {
    const existingUplineUser: any = await getUserByEmail(existingUpline.email);
    if (existingUplineUser) {
      await db.user.update({
        where: { email: existingUplineUser.email },
        data: {
          cash_balance: existingUplineUser.cash_balance + uplineCashBalanceProfit,
        },
      });

      // Update upline's portfolio
      const existingUplinePortfolio: any = await getPortfolioDataByEmail(
        existingUplineUser.email
      );
      if (existingUplinePortfolio) {
        await db.portfolio.update({
          where: { email: existingUplineUser.email },
          data: {
            total_affiliates_profit:
              existingUplinePortfolio.total_affiliates_profit + uplineCashBalanceProfit,
            total_profit:
              existingUplinePortfolio.total_profit + uplineCashBalanceProfit,
          },
        });
      }
    }
  }

  // Update company's cash balance
  const existingCompany: any = await getUserByEmail(company_email);
  if (existingCompany) {
    await db.user.update({
      where: { email: company_email },
      data: {
        cash_balance: existingCompany.cash_balance + companyCashBalanceProfit,
      },
    });
  }

  // Update seller's portfolio
  const existingSellerPortfolio: any = await getPortfolioDataByEmail(
    seller_user_info.email
  );
  if (existingSellerPortfolio) {
    await db.portfolio.update({
      where: { email: seller_user_info.email },
      data: {
        total_shares_sold: existingSellerPortfolio.total_shares_sold + seller_amount,
        total_profit:
          existingSellerPortfolio.total_profit + sellerCashBalanceProfit,
      },
    });
  }
};

const placeBuyOrder = async (
  existingUser: any,
  shares_order_amount: any,
  sellerMatchID: any
) => {
  const AddBuyOrder = await db.exchange.create({
    data: {
      email: existingUser.email,
      name: existingUser.fullname,
      type: "buy",
      matchID: sellerMatchID,
      amount: shares_order_amount,
      status: "bought",
    } as any,
  });
  const UpdateBuyerAccountInfo = await db.user.update({
    where: { email: existingUser.email },
    data: {
      shares_balance: existingUser.shares_balance + shares_order_amount,
      cash_balance: existingUser.cash_balance - shares_order_amount,
    } as any,
  });
  const existingBuyerPortfolio: any = await getPortfolioDataByEmail(
    existingUser.email
  );
  if (existingBuyerPortfolio) {
    const UpdateBuyerPortfolio = await db.portfolio.update({
      where: { email: existingUser.email },
      data: {
        total_shares_bought:
          existingBuyerPortfolio.total_shares_bought + shares_order_amount,
      } as any,
    });
  }
};

const updatePopularBoughtSharesModel = async (shares_order_amount: any) => {
  const popularSharesBought = await getpopularSharesBoughtBySharesAmount(
    `${shares_order_amount}`
  );
  const totalSpecificOrders: any = await getTotalOrdersByTypeAndAMount(
    "buy",
    shares_order_amount
  );
  const totalOrders: any = await getTotalOrdersByType("buy");

  if (popularSharesBought) {
    if (totalSpecificOrders || totalOrders) {
      let existingSpecificOrders;
      let existingOrdercount;
      const count_total_specific_orders = totalSpecificOrders.length;
      const count_total_orders = totalOrders.length;
      if (count_total_specific_orders === 0) {
        existingSpecificOrders = 1;
        existingOrdercount = 1;
      } else {
        existingSpecificOrders = count_total_specific_orders;
        existingOrdercount = count_total_orders;
      }
      const popularity_percentage = Math.floor(
        (existingSpecificOrders / existingOrdercount) * 100
      );

      await db.popularSharesBought.update({
        where: { name: `${shares_order_amount}` },
        data: {
          buyers: popularity_percentage,
        },
      });
    }
  } else {
    if (totalSpecificOrders || totalOrders) {
      let existingSpecificOrders;
      let existingOrdercount;
      const count_total_specific_orders = totalSpecificOrders.length;
      const count_total_orders = totalOrders.length;
      if (count_total_specific_orders === 0) {
        existingSpecificOrders = 1;
        existingOrdercount = 1;
      } else {
        existingSpecificOrders = count_total_specific_orders;
        existingOrdercount = count_total_orders;
      }

      const popularity_percentage = Math.floor(
        (existingSpecificOrders / existingOrdercount) * 100
      );
      await db.popularSharesBought.create({
        data: {
          name: `${shares_order_amount}`,
          buyers: popularity_percentage,
          price: shares_order_amount,
          type: "buy",
        },
      });
    }
  }
};

export const BuyShares = async (values: any) => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "User does not exist!" };
  }
  const existingUser = await getUserById(user.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }
  const cash_balance: any = existingUser.cash_balance;
  const shares_order_amount: any = values.amount;
  const shares_order_type: any = values.ordertype;

  // Validate shares_order_amount and shares_order_type
  if (!shares_order_amount || isNaN(shares_order_amount) || shares_order_amount < 375 || shares_order_amount > 7500 || shares_order_type !== "buy") {
    return { success: false, message: "Invalid params!" };
  }

  if (shares_order_amount > cash_balance) {
    return { success: false, message: "Insufficient funds in cash balance!" };
  }

  // Validate order amount allowed values
  const allowedOrderAmounts = [375, 750, 1500, 2250, 3000, 3750, 4500, 5250, 6000, 6750, 7500];
  if (!allowedOrderAmounts.includes(shares_order_amount)) {
    return { success: false, message: "Invalid order amount!" };
  }

  // Calculate seller_amount based on shares_order_amount
  let seller_amount: number;
  switch (shares_order_amount) {
    case 375: seller_amount = 250; break;
    case 750: seller_amount = 500; break;
    case 1500: seller_amount = 1000; break;
    case 2250: seller_amount = 1500; break;
    case 3000: seller_amount = 2000; break;
    case 3750: seller_amount = 2500; break;
    case 4500: seller_amount = 3000; break;
    case 5250: seller_amount = 3500; break;
    case 6000: seller_amount = 4000; break;
    case 6750: seller_amount = 4500; break;
    case 7500: seller_amount = 5000; break;
    default: return { success: false, message: "Invalid order amount!" };
  }

  try {
    const FirstMatchSellOrder = await getAllOrderDataByAmountAndType(seller_amount, "sell", "waiting", 1);

    // Found first matching seller order
    if (FirstMatchSellOrder.length !== 0) {
      const seller_user_info = await getUserByEmail(FirstMatchSellOrder[0].email);
      const seller_id = FirstMatchSellOrder[0].id;

      if (seller_user_info) {
        await updateSellerModel(seller_user_info, seller_id, shares_order_amount, seller_amount);
        await placeBuyOrder(existingUser, shares_order_amount, FirstMatchSellOrder[0].matchID);
        await updatePopularBoughtSharesModel(shares_order_amount);

        return {
          success: true,
          message: `Seller found!`,
          info: `You bought ${shares_order_amount} Shares from ${seller_user_info.fullname}, Match ID: ${FirstMatchSellOrder[0].matchID}!`
        };
      }
    }

    // Handle larger orders and distribute across smaller sellers
    if (shares_order_amount >= 1500) {
      let remainingAmount = shares_order_amount;
      const generatedNewMatchID = await generateAutoIncrementMatchID();

      const matchAndDistributeShares = async (amountPerSeller: number, sellerOrderAmount: number) => {
        if (remainingAmount >= amountPerSeller) {
          const sellersNeeded = Math.ceil(remainingAmount / amountPerSeller);
          const sellOrders = await getAllOrderDataByAmountAndType(sellerOrderAmount, "sell", "waiting", sellersNeeded);
          const sellerOrderShares = Math.floor(shares_order_amount / sellersNeeded);

          if (sellOrders.length >= sellersNeeded) {
            remainingAmount -= sellersNeeded * amountPerSeller;

            for (const sellOrder of sellOrders) {
              const seller_user_info = await getUserByEmail(sellOrder.email);
              await updateSellerModel(seller_user_info, sellOrder.id, sellerOrderShares, sellerOrderAmount);
            }

            await placeBuyOrder(existingUser, shares_order_amount, generatedNewMatchID);
          }
        }
      };

      await matchAndDistributeShares(3750, 2500);
      await matchAndDistributeShares(3000, 2000);
      await matchAndDistributeShares(2250, 1500);
      await matchAndDistributeShares(1500, 1000);
      await matchAndDistributeShares(750, 500);
      await matchAndDistributeShares(375, 250);

      await updatePopularBoughtSharesModel(shares_order_amount);

      if (remainingAmount === 0) {
        return {
          success: true,
          message: `Sellers found!`,
          info: `You bought ${shares_order_amount} Shares, MatchID: [Break Order ID: ${generatedNewMatchID}] Order split and matched with multiple sellers!`
        };
      }
    }

    // Fallback to company if no sellers found
    const company_email = "easyshares254@gmail.com";
    const company_matchID: any = await generateAutoIncrementMatchID();

    await db.exchange.create({
      data: {
        email: existingUser.email,
        name: existingUser.fullname,
        type: shares_order_type,
        matchID: company_matchID,
        amount: shares_order_amount,
        status: "bought",
      }
    });

    const company_user_info = await getUserByEmail(company_email);

    if (company_user_info) {
      await db.user.update({
        where: { email: existingUser.email },
        data: {
          shares_balance: existingUser.shares_balance + shares_order_amount,
          cash_balance: existingUser.cash_balance - shares_order_amount,
        }
      });

      await db.user.update({
        where: { email: company_email },
        data: {
          cash_balance: company_user_info.cash_balance + shares_order_amount,
        }
      });

      await updatePortfolio(existingUser.email, company_email, shares_order_amount);

      return {
        success: true,
        message: `Seller found!`,
        info: `You bought ${shares_order_amount} Shares from ${company_user_info.fullname}, Match ID: ${company_matchID}!`
      };
    } else {
      return {
        success: false,
        message: `An error occurred, please try again!`
      };
    }
  } catch (error) {
    return {
      success: false,
      message: `An error occurred, please try again!`
    };
  }
};

// Utility function to update both buyer and company portfolios
async function updatePortfolio(buyerEmail: string, companyEmail: string, shares_order_amount: number) {
  const existingBuyerPortfolio: any = await getPortfolioDataByEmail(buyerEmail);
  if (existingBuyerPortfolio) {
    await db.portfolio.update({
      where: { email: buyerEmail },
      data: {
        total_shares_bought: existingBuyerPortfolio.total_shares_bought + shares_order_amount,
      }
    });
  }

  const existingCompanyPortfolio: any = await getPortfolioDataByEmail(companyEmail);
  if (existingCompanyPortfolio) {
    await db.portfolio.update({
      where: { email: companyEmail },
      data: {
        total_shares_sold: existingCompanyPortfolio.total_shares_sold + shares_order_amount,
        total_profit: existingCompanyPortfolio.total_profit + shares_order_amount,
      }
    });
  }
}

export const SellShares = async (values: any) => {
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "User does not exist!" };
  }
  const existingUser = await getUserById(user.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }
  const shares_balance = existingUser.shares_balance;
  const cash_balance = existingUser.cash_balance;
  const shares_order_amount = values.amount;
  const shares_order_type = values.ordertype;
  if (shares_order_amount === null) {
    return { success: false, message: "Invalid params!" };
  }
  if (isNaN(shares_order_amount)) {
    return { success: false, message: "Invalid amount!" };
  }
  if (shares_order_amount < 250) {
    return { success: false, message: "Invalid params!" };
  }
  if (shares_order_amount > 5000) {
    return { success: false, message: "Invalid params!" };
  }
  if (shares_order_amount > shares_balance) {
    return {
      success: false,
      message: "Insufficient shares in shares balance!",
    };
  }
  if (shares_order_type !== "sell") {
    return { success: false, message: "Invalid params!" };
  }
  if (
    shares_order_amount !== 250 &&
    shares_order_amount !== 500 &&
    shares_order_amount !== 1000 &&
    shares_order_amount !== 1500 &&
    shares_order_amount !== 2000 &&
    shares_order_amount !== 2500 &&
    shares_order_amount !== 3000 &&
    shares_order_amount !== 3500 &&
    shares_order_amount !== 4000 &&
    shares_order_amount !== 4500 &&
    shares_order_amount !== 5000
  ) {
    return { success: false, message: "Invalid params!" };
  }
  const matchID: any = await generateAutoIncrementMatchID();
  if (!matchID) {
    return {
      success: false,
      message: `An error occured, try again!`,
    };
  }
  const UpdateAccountInfo = await db.user.update({
    where: { email: existingUser.email },
    data: {
      shares_balance: existingUser.shares_balance - shares_order_amount,
    } as any,
  });
  const AddSellOrder = await db.exchange.create({
    data: {
      email: existingUser.email,
      name: existingUser.fullname,
      type: shares_order_type,
      matchID: matchID,
      amount: shares_order_amount,
      status: "waiting",
    } as any,
  });

  const popularSharesSold = await getpopularSharesSoldBySharesAmount(
    `${shares_order_amount}`
  );
  const totalSpecificOrders: any = await getTotalOrdersByTypeAndAMount(
    "sell",
    shares_order_amount
  );
  const totalOrders: any = await getTotalOrdersByType("sell");
  if (popularSharesSold) {
    if (totalSpecificOrders || totalOrders) {
      let existingSpecificOrders;
      let existingOrdercount;
      const count_total_specific_orders = totalSpecificOrders.length;
      const count_total_orders = totalOrders.length;
      if (count_total_specific_orders === 0) {
        existingSpecificOrders = 1;
        existingOrdercount = 1;
      } else {
        existingSpecificOrders = count_total_specific_orders;
        existingOrdercount = count_total_orders;
      }
      const popularity_percentage = Math.floor(
        (existingSpecificOrders / existingOrdercount) * 100
      );

      await db.popularSharesSold.update({
        where: { name: `${shares_order_amount}` },
        data: {
          sellers: popularity_percentage,
        },
      });
    }
  } else {
    if (totalSpecificOrders || totalOrders) {
      const count_total_specific_orders = totalSpecificOrders.length;
      const count_total_orders = totalOrders.length;
      let existingSpecificOrders;
      let existingOrdercount;
      if (count_total_specific_orders === 0) {
        existingSpecificOrders = 1;
        existingOrdercount = 1;
      } else {
        existingSpecificOrders = count_total_specific_orders;
        existingOrdercount = count_total_orders;
      }
      const popularity_percentage = Math.floor(
        (existingSpecificOrders / existingOrdercount) * 100
      );

      await db.popularSharesSold.create({
        data: {
          name: `${shares_order_amount}`,
          sellers: popularity_percentage,
          price: shares_order_amount + shares_order_amount / 2,
          type: "sell",
        },
      });
    }
  }

  return {
    success: true,
    message: `Congrats, Shares sold!`,
    info: `You sold ${shares_order_amount} Shares,Your Match ID : ${matchID}, Once a buyer is found we'll match them using your MatchID!`,
  };
};
