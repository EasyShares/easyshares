import React from "react";
import DashBoardNav from "@/components/DashBoardNav";
import DashBoardFooter from "@/components/DashBoardFooter";
import { Metadata } from "next";
import { currentUser } from "@/lib/auth";
import CompetitionPage from "@/components/dashboard/CompetitionPage";
import { getCompetitionDataByUrl } from "@/data/competitions";

export const metadata: Metadata = {
  title: "Competition",
  description: "Participate in this month's Competition and stand a chance to win up to 100,000 Shares",
};

interface Props {
  params: { competition_url: string };
}

const DynamicRouteParam = async ({ params }: Props) => {
  const competitionUrl = `/${params.competition_url}`;

  // Early return if competition_url length is too long
  if (competitionUrl.length > 40) return;

  // Fetch competition data if URL is valid
  const competition = competitionUrl ? await getCompetitionDataByUrl(competitionUrl) : null;

  // Get current user
  const user = await currentUser();

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen dark:bg-gray-900">
      <DashBoardNav user={user} />
      <CompetitionPage competition={competition} />
      <DashBoardFooter />
    </div>
  );
};

export default DynamicRouteParam;
