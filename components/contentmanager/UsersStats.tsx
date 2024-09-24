"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Users = ({ admins, users }: any) => {
  const [totalUsers, setTotalUsers] = useState<any>(0);
  const [totalAdmins, setTotalAdmins] = useState<any>(0);
  const [totalAcive, setTotalAcive] = useState<any>(0);
  const [totalBlocked, setTotalBlocked] = useState<any>(0);
  const [usersPercentage, setUsersPercentage] = useState<any>(100);
  const [adminPercentage, setAdminPercentage] = useState<any>(100);

  useEffect(() => {
    function calculateUsersStats() {
      if (users.length !== 0 || admins.length !== 0) {
        const total_users = users.length;
        setTotalUsers(total_users);
        setTotalAcive(total_users);
        setTotalBlocked(0);

        const total_admins = admins.length;
        setTotalAdmins(total_admins);

        const users_percentage =
          ((total_users - total_admins) / totalUsers) * 100;
        const admins_percentage = (total_admins / total_users) * 100;
        setAdminPercentage(admins_percentage);
        setUsersPercentage(users_percentage);
      }
    }
    calculateUsersStats();
  });
  const AllUsers = [
    {
      name: "Total Users",
      price: totalUsers,
      bgColor: "bg-blue-200",
      percentage: usersPercentage,
    },
    {
      name: "Total Admins",
      price: totalAdmins,
      bgColor: "bg-yellow-200",
      percentage: adminPercentage,
    },
    {
      name: "Active Accounts",
      price: totalAcive,
      bgColor: "bg-green-300",
      percentage: 100,
    },
    {
      name: "Blocked Accounts",
      price: totalBlocked,
      bgColor: "bg-red-300",
      percentage: 0,
    },
  ];
  return (
    <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Users Statistics
      </h2>
      <Link href="/contentmanager/manage-users">
        <button className="mt-3 mb-3 bg-blue-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-600">
          Manage Users
        </button>
      </Link>
      <div className="w-full lg:mr-4">
        <div className="flex flex-wrap gap-4">
          {AllUsers.map((share, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-lg ${share.bgColor} flex items-center justify-between flex-wrap max-h-64 min-w-64`}
            >
              <div>
                <h3 className="text-lg font-semibold">{share.name}</h3>
                <p className="mt-2 font-semibold">{share.price}</p>
                <p className="mt-2 font-semibold">
                  {Math.round(share.percentage)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
