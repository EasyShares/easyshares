import { db } from "@/lib/prisma";

export const geCompetitionsData = async () => {
  try {
    const competitions = await db.competition.findMany();
    return competitions;
  } catch {
    return [];
  }
};

export const getCompetitionDataByID = async (id: string) => {
  try {
    const competition = await db.competition.findFirst({
      where: { id },
    });
    return competition;
  } catch {
    return null;
  }
};

export const getCompetitionDataByUrl = async (url: string) => {
  try {
    const competition = await db.competition.findFirst({
      where: { url: url },
    });
    return competition;
  } catch {
    return [];
  }
};

export const getCompetitionParticipants = async (competitionID: string) => {
  try {
    const participants = await db.participant.findMany({
      where: { competitionID },
      orderBy: {
        referrals: "desc",
      },
    });
    return participants;
  } catch {
    return [];
  }
};

export const getCompetitionParticipant = async (
  email: string,
  competitionID: string
) => {
  try {
    const participants = await db.participant.findMany({
      where: { email, competitionID },
    });
    return participants;
  } catch {
    return [];
  }
};

export const getCompetitionParticipantByCompetitionIDAndEmail = async (
  competitionID: string,
  email: string
) => {
  try {
    const participants = await db.participant.findMany({
      where: { competitionID, email },
    });
    return participants;
  } catch {
    return null;
  }
};

export const getOngoingCompetition = async () => {
  try {
    const participants = await db.competition.findFirst({
      where: { status: "ongoing" },
    });
    return participants;
  } catch {
    return null;
  }
};

export const getCompetitionByUrl = async (url: string) => {
  try {
    const competition = await db.competition.findFirst({
      where: { url: url },
    });
    return competition;
  } catch {
    return null;
  }
};
