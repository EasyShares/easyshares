import React from "react";
import DashBoardFooter from "@/components/DashBoardFooter";
import DashBoardNav from "@/components/DashBoardNav";
import { RoleGate } from "@/components/auth/RoleGate";
import { currentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import Contacts from "@/components/contentmanager/Contacts";
import { getAllContacts } from "@/data/content-manager";

const ContactPage = async () => {
  const user = await currentUser();
  const contacts = await getAllContacts();

  return (
    <>
      <RoleGate user={user} allowedRole={UserRole.ADMIN}>
        <div className="flex flex-col  bg-gray-100 dark:bg-gray-900 min-h-screen">
          <DashBoardNav user={user}></DashBoardNav>
          <div className="container mx-auto px-4 py-8 flex-grow">
            <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
              Support
            </h1>
            <Contacts contacts={contacts}></Contacts>
          </div>
          <DashBoardFooter />
        </div>
      </RoleGate>
    </>
  );
};

export default ContactPage;
