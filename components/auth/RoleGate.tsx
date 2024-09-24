"use client";
import React from "react";
import ErrorPage from "@/app/not-found";
import { UserRole } from "@prisma/client";
import { ExtendedUser } from "@/next-auth";

interface RoleGateProps {
  user?: ExtendedUser;
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate: React.FC<RoleGateProps> = ({
  user,
  allowedRole,
  children,
}) => {
  if (user?.role !== allowedRole) {
    return <ErrorPage />;
  }

  return <>{children}</>;
};
