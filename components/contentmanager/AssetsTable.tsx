"use client";
import { useEffect, useState } from "react";
import EditAssetInfo from "./EditAssetInfo";
import DeleteAssetInfo from "./DeleteAssetInfo";

type User = {
  fullname: string;
  phone: string;
  email: string;
  cash_balance: number;
  shares_balance: number;
  id: string;
};

type SortKey = keyof User;

const UserTable = ({ users }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [goToPage, setGoToPage] = useState(1);
  const [selectedEditId, setSelectedEditId] = useState<any>(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState<any>(null);
  const itemsPerPage = 10;

  const filteredUsers = users.filter(
    (user: any) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
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

  const handleDelete = (id: any, email: any) => {
    setSelectedDeleteId({
      id: id,
      email: email,
    });
  };

  const handleEdit = (
    id: any,
    phone: any,
    email: any,
    cash_balance: any,
    shares_balance: any,
    fullName: any,
    refferer: any,
    role: any
  ) => {
    setSelectedEditId({
      id: id,
      phone: phone,
      email: email,
      cash_balance: cash_balance,
      shares_balance: shares_balance,
      fullName: fullName,
      refferer: refferer,
      role: role,
    });
  };

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
      {selectedEditId && (
        <EditAssetInfo
          Id={selectedEditId}
          onClose={() => setSelectedEditId(null)}
        />
      )}
      {selectedDeleteId && (
        <DeleteAssetInfo
          Id={selectedDeleteId}
          onClose={() => setSelectedDeleteId(null)}
        />
      )}
      <div className="mb-4">
        <input
          className="border dark:bg-gray-900 dark:border-gray-700 dark:text-white border-gray-300 rounded-md px-4 py-2 mb-2"
          type="text"
          placeholder="Search users..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border dark:bg-gray-800 border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("phone")}
              >
                Phone {getSortIcon("phone")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("email")}
              >
                Email {getSortIcon("email")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("cash_balance")}
              >
                Cash balance {getSortIcon("cash_balance")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("shares_balance")}
              >
                Shares balance {getSortIcon("shares_balance")}
              </th>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user: any) => (
              <tr
                key={user.id}
                className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              >
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                  {user.phone}
                </td>
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                  {user.email}
                </td>
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                  {user.cash_balance}
                </td>
                <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                  {user.shares_balance}
                </td>
                <td className="flex flex-wrap justify-between px-4 py-2 border border-gray-300 dark:border-gray-700">
                  <button
                    className="text-blue-500 underline"
                    onClick={() => {
                      handleEdit(
                        user.id,
                        user.phone,
                        user.email,
                        user.cash_balance,
                        user.shares_balance,
                        user.fullname,
                        user.uplineCode,
                        user.role
                      );
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-blue-500 underline"
                    onClick={() => handleDelete(user.id, user.email)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
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
          className="border border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white rounded-md px-4 py-1 mb-2"
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

export default UserTable;
