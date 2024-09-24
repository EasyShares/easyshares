import React from "react";
import DashBoardNav from "@/components/DashBoardNav";
import DashBoardFooter from "@/components/DashBoardFooter";
import { Metadata } from "next";
import TransactionTable from "@/components/dashboard/TransactionTable";
import { currentUser } from "@/lib/auth";
import {
  getCashTransactionsByEmail,
  getExchangeTransactionsByEmail,
} from "@/data/transaction";

export const metadata: Metadata = {
  title: "Transactions",
  description:
    "Track your financial activities with ease. View a detailed history of your deposits, withdrawals and transfers on EasyShares.",
};

const Transactions = async () => {
  const user = await currentUser();
  const cashtransactions = await getCashTransactionsByEmail(user?.email);
  const exchangetransactions = await getExchangeTransactionsByEmail(
    user?.email
  );
  return (
    <>
      <div className="flex flex-col bg-gray-50 min-h-screen dark:bg-gray-900">
        <DashBoardNav user={user} />
        <div className="container mx-auto px-4 py-8 flex-grow">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 dark:text-white">
            Transactions
          </h1>
          {/* TransactionsTable */}
          <TransactionTable
            cashtransactions={cashtransactions}
            exchangetransactions={exchangetransactions}
          ></TransactionTable>
        </div>
        <DashBoardFooter />
      </div>
    </>
  );
};

export default Transactions;
