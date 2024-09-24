"use client";
import React, { useState, useEffect } from "react";
import EditAdInfo from "./EditAdInfo";
import DeleteAdInfo from "./DeleteAdInfo";

type User = {
  name: string;
  url: string;
  code: string;
  cname: string;
  cemail: string;
  type: string;
  status: string;
};

type SortKey = keyof User;

const AdTable = ({ ads }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [goToPage, setGoToPage] = useState(1);
  const [selectedEditId, setSelectedEditId] = useState<any>(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState<any>(null);
  const itemsPerPage = 10;

  const filteredUsers = ads.filter(
    (user: any) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.cname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.cemail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const handleDelete = (id: any) => {
    setSelectedDeleteId({
      id: id,
    });
  };

  const handleEdit = (
    id: any,
    name: any,
    description: any,
    url: any,
    code: any,
    cname: any,
    cemail: any,
    type: any,
    status: any
  ) => {
    setSelectedEditId({
      id: id,
      name: name,
      description: description,
      url: url,
      code: code,
      cname: cname,
      cemail: cemail,
      type: type,
      status: status,
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
        <EditAdInfo
          Id={selectedEditId}
          onClose={() => setSelectedEditId(null)}
        />
      )}
      {selectedDeleteId && (
        <DeleteAdInfo
          Id={selectedDeleteId}
          onClose={() => setSelectedDeleteId(null)}
        />
      )}
      <div className="mb-4">
        <input
          className="border border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-md px-4 py-2 mb-2"
          type="text"
          placeholder="Search ads..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-white">
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("name")}
              >
                Ad Name {getSortIcon("name")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("url")}
              >
                Ad Url {getSortIcon("url")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("code")}
              >
                Ad Code {getSortIcon("code")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("cname")}
              >
                Company Name {getSortIcon("cname")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("cemail")}
              >
                Company Email {getSortIcon("cemail")}
              </th>
              <th
                className="cursor-pointer px-4 py-2 border border-gray-300 dark:border-gray-700"
                onClick={() => handleSort("type")}
              >
                Ad Type {getSortIcon("type")}
              </th>
              <th className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  No ads yet.
                </td>
              </tr>
            ) : (
              sortedUsers.map((user: any) => (
                <tr
                  key={user.id}
                  className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                >
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                    {user.url}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                    {user.code}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                    {user.cname}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                    {user.cemail}
                  </td>
                  <td className="px-4 py-2 border border-gray-300 dark:border-gray-700">
                    {user.type}
                  </td>
                  <td className="justify-between px-4 py-2 border border-gray-300 dark:border-gray-700">
                    <button
                      className="text-blue-500 underline mr-3"
                      onClick={() => {
                        handleEdit(
                          user.id,
                          user.name,
                          user.description,
                          user.url,
                          user.code,
                          user.cname,
                          user.cemail,
                          user.type,
                          user.status
                        );
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-blue-500 underline"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
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

export default AdTable;
