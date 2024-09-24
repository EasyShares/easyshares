"use client";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { format } from "date-fns";

type User = {
  id: string;
  amount: string;
  email: string;
  type: string;
  status: string;
  createdAt: any;
  updatedAt: any;
};

type SortKey = keyof User;

const TransactionTable = ({ exchangetransactions, cashtransactions }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [goToPage, setGoToPage] = useState(1);
  const itemsPerPage = 10;

  const alltransactions = [...cashtransactions, ...exchangetransactions];
  const filteredTransactions = alltransactions.filter(
    (transaction) =>
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  let sortedTransactions = paginatedTransactions;

  if (sortBy) {
    sortedTransactions = sortedTransactions.slice().sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      if (sortDirection === "desc") {
        setSortBy(undefined);
        setSortDirection("asc");
      } else {
        setSortDirection("desc");
      }
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (key: SortKey) => {
    if (sortBy === key) {
      return sortDirection === "asc" ? "🔼" : "🔽";
    }
    return "";
  };

  useEffect(() => {
    if (goToPage >= 1 && goToPage <= totalPages) {
      setPage(goToPage);
    }
  }, [goToPage, totalPages]);

  function changeStateType(status: any) {
    if (status === "sold" || status === "bought" || status === "Completed") {
      return "Completed";
    }
    if (status === "waiting" || status === "Pending") {
      return "Pending";
    }
    return status;
  }

  return (
    <>
      <div className="mb-4">
        <input
          className="border border-gray-300 dark:bg-gray-900  dark:text-white rounded-md px-4 py-2 mb-2"
          type="text"
          placeholder="Search transactions..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border dark:bg-gray-800 dark:border-gray-700 dark:text-white border-gray-300">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("type")}
              >
                Category {getSortIcon("type")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("status")}
              >
                Status {getSortIcon("status")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("createdAt")}
              >
                Date {getSortIcon("createdAt")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("amount")}
              >
                Amount {getSortIcon("amount")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No transactions yet ?
                  <Link href={"/dashboard/account"}>
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white border border-blue-dark rounded px-6 py-4 lg:ml-5 mt-5 lg:mt-0"
                    >
                      Deposit now
                    </button>
                  </Link>
                </td>
              </tr>
            ) : (
              sortedTransactions
                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())  // Sort by latest createdAt
                .map((transaction) => (
                  <tr
                    key={transaction.createdAt}
                    className="bg-white dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                      {transaction.type === "sell" && <span>Sell Shares</span>}
                      {transaction.type === "buy" && <span>Buy Shares</span>}
                      {transaction.type !== "sell" && transaction.type !== "buy" && (
                        <span>{transaction.type}</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                      {changeStateType(transaction.status) === "Completed" && (
                        <span className="text-green-500 font-semibold">Completed</span>
                      )}
                      {changeStateType(transaction.status) === "Pending" && (
                        <span className="text-yellow-500 font-semibold">Pending</span>
                      )}
                      {changeStateType(transaction.status) === "Cancelled" && (
                        <span className="text-red-500 font-semibold">Cancelled</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                      {format(new Date(transaction.createdAt), "MM/dd/yyyy p")}
                    </td>
                    <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                      {transaction.amount}
                    </td>
                  </tr>
                ))           
            )}
          </tbody>
        </table>
      </div>
      <div>
        <button
          className="text-blue-500 font-semibold mr-3 mt-3 underline"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="text-red-500 font-semibold mr-3">
          Page {page} of {totalPages}
        </span>
        <button
          className="text-blue-500 font-semibold mr-3 mt-3 underline"
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
        <span className="text-red-500 font-semibold mr-1">Go to:</span>
        <input
          className="border border-gray-300 rounded-md px-4 py-1 mb-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          type="number"
          value={goToPage}
          onChange={(e) => setGoToPage(parseInt(e.target.value))}
          min={1}
          max={totalPages}
          style={{ width: "100px" }}
        />
      </div>
    </>
  );
};

export default TransactionTable;
