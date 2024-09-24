import React from "react";
import DashBoardNav from "@/components/DashBoardNav";
import DashBoardFooter from "@/components/DashBoardFooter";
import { Metadata } from "next";
import CompetitionsMoreInfo from "@/components/dashboard/CompetitionsMoreInfo";
import Competitions from "@/components/dashboard/Competitions";
import { currentUser } from "@/lib/auth";
import { geCompetitionsData } from "@/data/competitions";
import { updateCompetitionRefferals } from "@/actions/competition";

export const metadata: Metadata = {
  title: "Refferal Competition",
  description:
    "Participate in EasyShares Monthly Refferal Competition and Stand a chance to win upto 100,000 Shares.",
};

const Competition = async () => {
  const user = await currentUser();
  const competitions = await geCompetitionsData();
  const updaterefferals = await updateCompetitionRefferals();
  return (
    <>
      <div className="flex flex-col  bg-gray-50 min-h-screen dark:bg-gray-900">
        <DashBoardNav user={user} />
        <div className="container mx-auto px-4 py-8 flex-grow dark:text-white">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 dark:text-white">
            Refferal Monthly Competition
          </h1>
          <p className="text-x font-bold">How it works ?</p>
          <p className="text-sm font-semibold">
            Participate in the refferal competition every month where the person
            with the highest number of refferals per month is the winner of the
            competition. The competition starts every start (1st) of the month
            and ends at the end of month.
          </p>
          <CompetitionsMoreInfo></CompetitionsMoreInfo>
        </div>

        <Competitions competitions={competitions}></Competitions>

        <DashBoardFooter />
      </div>
    </>
  );
};

export default Competition;
