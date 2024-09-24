"use client";
import React, { useEffect, useState } from "react";

type Props = {
  position: string;
  name: string;
  prize: number;
  refferals: string;
};

type SortKey = keyof Props;

const CompetitionStandings = ({ participants }: any) => {
  const [isTabOpen, setIsTabOpen] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [goToPage, setGoToPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = participants.filter((user: any) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
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

  const closeTab = () => {
    setIsTabOpen(false);
  };

  return (
    <>
      {isTabOpen && (
        <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white border-t border-b sm:border-l sm:rounded shadow m-5">
          <div
            onClick={closeTab}
            typeof="button"
            className="bg-white dark:bg-gray-700 dark:border-gray-700 dark:text-white border-b border-l right-5 absolute"
          >
            <div className="p-2 cursor-pointer hover:text-red-500">
              Close Tab
            </div>
          </div>
          <div className="flex flex-col ml-5 mr-5 mb-5 mt-5">
            <div className="w-full lg:mr-4">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">
                Live Standings
              </h2>
            </div>
            <div className="mb-4">
              <input
                className="border border-gray-300 dark:bg-gray-900  dark:text-white rounded-md px-4 py-2 mb-2"
                type="text"
                placeholder="Search competitor..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800">
                    <th
                      className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                      onClick={() => handleSort("position")}
                    >
                      Position {getSortIcon("position")}
                    </th>
                    <th
                      className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                      onClick={() => handleSort("name")}
                    >
                      Name {getSortIcon("name")}
                    </th>
                    <th
                      className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                      onClick={() => handleSort("refferals")}
                    >
                      Refferals {getSortIcon("refferals")}
                    </th>
                    <th
                      className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                      onClick={() => handleSort("prize")}
                    >
                      Prize {getSortIcon("prize")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedUsers.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        No Participants yet. Join now!!!
                      </td>
                    </tr>
                  ) : (
                    sortedUsers.map((user: any, index: any) => {
                      let prize = 0;
                      let textClass;
                      if (index === 0) {
                        prize = 100000;
                        textClass = "font-bold text-green-500";
                      } else if (index === 1) {
                        prize = 50000;
                        textClass = "font-bold text-blue-500";
                      } else if (index === 2) {
                        prize = 20000;
                        textClass = "font-bold text-yellow-500";
                      } else if (index >= 3 && index <= 9) {
                        prize = 5000;
                        textClass = "font-bold text-volet-500";
                      } else if (index >= 10 && index <= 99) {
                        prize = 1000;
                        textClass = "font-bold text-red-500";
                      } else if (index >= 100) {
                        prize = 0;
                      }

                      return (
                        <tr
                          key={user.id}
                          className="bg-white dark:bg-gray-900  dark:text-white"
                        >
                          <td
                            className={`px-4 py-2 border border-gray-300 dark:border-gray-700 ${textClass}`}
                          >
                            {index + 1}
                          </td>
                          <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                            {user.name}
                          </td>
                          <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                            {user.referrals}
                          </td>
                          <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                            {prize.toLocaleString()} Shares
                          </td>
                        </tr>
                      );
                    })
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
                className="border border-gray-300 dark:bg-gray-900 dark:border-gray-700 dark:text-white rounded-md px-4 py-1 mb-2"
                type="number"
                value={goToPage}
                onChange={(e) => setGoToPage(parseInt(e.target.value))}
                min={1}
                max={totalPages}
                style={{ width: "100px" }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompetitionStandings;
