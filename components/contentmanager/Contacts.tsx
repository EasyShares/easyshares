"use client";
import React, { useState, useEffect } from "react";
import ReplyContact from "./ReplyContact";

const Contacts = ({ contacts }: any) => {
  const [activeTab, setActiveTab] = useState("unreplied");
  const [selectedReplyId, setSelectedReplyId] = useState<any>(null);
  const [repliedContacts, setrepliedContacts] = useState<any>([]);
  const [unrepliedContacts, setunrepliedContacts] = useState<any>([]);

  useEffect(() => {
    function SortContacts() {
      const replied = contacts.filter(
        (contact: any) => contact.status === "replied"
      );
      const unreplied = contacts.filter(
        (contact: any) => contact.status === "unreplied"
      );
      setrepliedContacts(replied);
      setunrepliedContacts(unreplied);
    }
    SortContacts();
  }, [contacts]);

  const handleReply = (
    id: any,
    name: any,
    email: any,
    subject: any,
    message: any
  ) => {
    setSelectedReplyId({
      id: id,
      name: name,
      email: email,
      subject: subject,
      message: message,
    });
  };

  return (
    <>
      {selectedReplyId && (
        <ReplyContact
          Id={selectedReplyId}
          onClose={() => setSelectedReplyId(null)}
        />
      )}
      <div>
        <div className="mb-6">
          <ul className="flex">
            <li
              className={`mr-6 cursor-pointer dark:text-white ${activeTab === "unreplied" ? "border-b-2 border-blue-500" : ""
                }`}
              onClick={() => setActiveTab("unreplied")}
            >
              Unreplied
            </li>
            <li
              className={`cursor-pointer dark:text-white ${activeTab === "replied" ? "border-b-2 border-blue-500" : ""
                }`}
              onClick={() => setActiveTab("replied")}
            >
              Replied
            </li>
          </ul>
        </div>
        <div className="flex flex-col space-y-4">
          {activeTab === "replied" ? (
            repliedContacts.length > 0 ? (
              // Sort contacts by date in descending order before mapping
              repliedContacts
                .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((contact: any, index: any) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
                  >
                    <div className="font-semibold">{contact.name}</div>
                    <div>{contact.message}</div>
                  </div>
                ))
            ) : (
              <div className="bg-white p-4 dark:bg-gray-800 dark:border-gray-700 dark:text-white rounded-lg shadow-md text-center">
                No Replied Messages
              </div>
            )
          ) : unrepliedContacts.length > 0 ? (
            // Sort contacts by date in descending order (newest first) before mapping
            unrepliedContacts
              .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((contact: any, index: any) => (
                <div
                  onClick={() => {
                    handleReply(
                      contact.id,
                      contact.name,
                      contact.email,
                      contact.subject,
                      contact.message
                    );
                  }}
                  key={index}
                  className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
                >
                  <div className="font-semibold">{contact.name}</div>
                  <div>{contact.subject}</div>
                </div>
              ))
          ) : (
            <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white p-4 rounded-lg shadow-md text-center">
              No Unreplied Messages
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Contacts;
