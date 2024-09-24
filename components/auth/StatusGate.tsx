"use client";
import React from "react";
import { ExtendedUser } from "@/next-auth";
import UnderMaintenance from "../UnderMaintenance";
import CommingSoon from "../CommingSoon";

interface StatusGateProps {
  settings?: any;
  children: React.ReactNode;
  user?: ExtendedUser;
}

export const StatusGate: React.FC<StatusGateProps> = ({
  settings,
  user,
  children,
}) => {
  const currentPath: string =
    typeof window !== "undefined" ? window.location.pathname : "";
  const isLoginUrl =
    currentPath.includes("/auth/login") ||
    currentPath.includes("/auth/login?callbackUrl=");
  const date = settings?.commingSoonAt;

  if (
    settings?.status === "under-maintenance" &&
    user?.role !== "ADMIN" &&
    !isLoginUrl
  ) {
    return <UnderMaintenance />;
  } else if (
    settings?.status === "comming-soon" &&
    user?.role !== "ADMIN" &&
    !isLoginUrl
  ) {
    return <CommingSoon date={date} settings={settings}></CommingSoon>;
  }

  return <>{children}</>;
};
