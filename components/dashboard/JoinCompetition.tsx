"use client";
import { RegisterCompetition } from "@/actions/competitions";
import React, { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

export const JoinCompetition = ({ competition, participant }: any) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    function CheckJoinedStatus() {
      if (participant.length !== 0) {
        setIsJoined(true);
      }
    }
    CheckJoinedStatus();
  });

  const handleSubmit = () => {
    const formData = {
      competitionID: competition?.id,
    };
    startTransition(() => {
      RegisterCompetition(formData)
        .then((data: any) => {
          const success = data.success;
          const message = data.message;
          if (success) {
            toast.success(`${message}`);
            setIsJoined(true);
          } else {
            toast.error(`${message}`);
            setIsJoined(false);
          }
        })
        .catch((error) => {
          toast.error("An error occured, try again!");
        });
    });
  };

  return (
    <>
      {competition?.status === "completed" ? (
        <></>
      ) : (
        <>
          {isJoined && (
            <button
              disabled
              className="bg-gray-500 text-white dark:bg-gray-800 dark:border-gray-700 dark:text-white text-sm font-semibold px-3 py-1 rounded-md "
            >
              Joined
            </button>
          )}{" "}
          {!isJoined && (
            <button
              disabled={isPending}
              onClick={handleSubmit}
              className="bg-green-500 text-white dark:text-white text-sm font-semibold px-3 py-1 rounded-md hover:bg-green-600"
            >
              Join
            </button>
          )}
        </>
      )}
    </>
  );
};
