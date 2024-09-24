"use client";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { format } from "date-fns";

type User = {
  id: String;
  email: String;
  uplineCode: String;
  status: String;
  createdAt: any;
};

type SortKey = keyof User;

const AffiliatesTable = ({ affiliates }: any) => {
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [goToPage, setGoToPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = affiliates.filter(
    (user: any) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  let sortedUsers = paginatedUsers;

  if (sortBy) {
    sortedUsers = sortedUsers.slice().sort((a: any, b: any) => {
      if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

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

  return (
    <>
      <div className="mb-4">
        <input
          className="border border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white rounded-md px-4 py-2 mb-2"
          type="text"
          placeholder="Search affiliate..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("email")}
              >
                Email {getSortIcon("email")}
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
                Joined Date {getSortIcon("createdAt")}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4 dark:text-white">
                  No affiliates yet.
                  <Link href={"/dashboard/settings"}>
                    <button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-600 text-white border border-blue-dark rounded px-6 py-4 lg:ml-5 mt-5 lg:mt-0"
                    >
                      Get refferal Link
                    </button>
                  </Link>
                </td>
              </tr>
            ) : (
              sortedUsers.map((user: any) => (
                <tr
                  key={user.createdAt}
                  className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                    {user.status === "Unverified" && (
                      <span className="text-red-500 font-semibold text-sm">
                        {user.status}
                      </span>
                    )}
                    {user.status === "Verified" && (
                      <span className="text-green-500 font-semibold text-sm">
                        {user.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                    {format(new Date(user.createdAt), "MM/dd/yyyy p")}
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
          className="border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-md px-4 py-1 mb-2"
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

export default AffiliatesTable;
