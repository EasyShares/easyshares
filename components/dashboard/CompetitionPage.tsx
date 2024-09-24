import React from "react";
import CompetitionStandings from "./CompetitionStandings";
import CompetitionsMoreInfo from "./CompetitionsMoreInfo";
import { JoinCompetition } from "./JoinCompetition";
import {
  getCompetitionParticipant,
  getCompetitionParticipants,
} from "@/data/competitions";
import { currentUser } from "@/lib/auth";
import { format } from "date-fns";

const CompetitionPage = async ({ competition }: any) => {
  const participants = await getCompetitionParticipants(competition?.id);
  const user = await currentUser();
  const email = user?.email;
  const participant = await getCompetitionParticipant(email, competition?.id);
  return (
    <>
      <h1 className="flex flex-wrap gap-5 text-3xl font-semibold text-gray-800 dark:text-white pl-5 pt-5">
        {competition?.name}
        <JoinCompetition
          competition={competition}
          participant={participant}
        ></JoinCompetition>
      </h1>
      <div className="pl-5">
        <CompetitionsMoreInfo></CompetitionsMoreInfo>
      </div>
      {competition?.status === "completed" && (
        <>
          <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white  border-t border-b sm:border-l sm:rounded shadow m-5">
            <div className="flex flex-col ml-5 mr-5 mb-5 mt-5">
              <p className="text-xl font-bold text-red-500">
                Competition Completed!
              </p>
              <p className="text-x font-semibold mt-3 text-green-500">
                Winner: {competition?.winner}
              </p>
              <p className="text-x font-semibold mt-3">
                Participants: {competition?.participants}
              </p>
              <p className="text-x font-semibold mt-3">
                Ended On: {format(new Date(competition?.endAt), "MM/dd/yyyy p")}
              </p>
            </div>
          </div>
        </>
      )}
      {competition?.status === "ongoing" && (
        <CompetitionStandings
          participants={participants}
        ></CompetitionStandings>
      )}
      {competition?.status === "upcoming" && (
        <>
          <div className="bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white  border-t border-b sm:border-l sm:rounded shadow m-5">
            <div className="flex flex-col ml-5 mr-5 mb-5 mt-5">
              <p className="text-xl font-bold text-blue-500">
                Competition not Stared yet!
              </p>
              <p className="text-x font-semibold mt-3 text-green-500">
                Winner: {competition?.winner}
              </p>
              <p className="text-x font-semibold mt-3">
                Participants: {competition?.participants}
              </p>
              <p className="text-x font-semibold mt-3">
                Starts On:{" "}
                {format(new Date(competition?.startAt), "MM/dd/yyyy p")}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CompetitionPage;
