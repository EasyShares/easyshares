import React from "react";
import DashBoardNav from "@/components/DashBoardNav";
import DashBoardFooter from "@/components/DashBoardFooter";
import Logout from "@/components/dashboard/Logout";
import CommingSoonMode from "@/components/contentmanager/CommingSoonMode";
import UnderMaintenanceMode from "@/components/contentmanager/MaintenanceMode.";
import { RoleGate } from "@/components/auth/RoleGate";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import Affiliate from "@/components/dashboard/Affiliate";
import AddCompetition from "@/components/contentmanager/AddCompetition";
import { getAllSettings } from "@/data/content-manager";
import WebsiteProfile from "@/components/contentmanager/WebsiteProfile";

const Settings = async () => {
  const user = await currentUser();
  const dbsettings: any = await getAllSettings();
  const settings = dbsettings[0];
  return (
    <>
      <RoleGate user={user} allowedRole={UserRole.ADMIN}>
        <div className="flex flex-col  bg-gray-100 dark:bg-gray-900 min-h-screen">
          <DashBoardNav user={user}></DashBoardNav>
          <div className="container mx-auto px-4 py-8 flex-grow">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
              Settings
            </h1>
            <Affiliate user={user}></Affiliate>
            <AddCompetition></AddCompetition>
            <CommingSoonMode settings={settings}></CommingSoonMode>
            <UnderMaintenanceMode settings={settings}></UnderMaintenanceMode>
            <WebsiteProfile settings={settings}></WebsiteProfile>
            <Logout></Logout>
          </div>

          <DashBoardFooter />
        </div>
      </RoleGate>
    </>
  );
};

export default Settings;
