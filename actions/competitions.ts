"use server";
import {
  getCompetitionDataByID,
  getCompetitionParticipant,
} from "@/data/competitions";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/prisma";

export const RegisterCompetition = async (values: any) => {
  if (!values.competitionID) {
    return { success: false, message: "Invalid params!" };
  }
  const user = await currentUser();
  if (!user) {
    return { success: false, message: "User does not exist!" };
  }
  const existingUser = await getUserById(user.id);
  if (!existingUser) {
    return { success: false, message: "User does not exist!" };
  }
  const isjoined = await getCompetitionParticipant(
    existingUser.email,
    values.competitionID
  );
  if (isjoined.length > 0) {
    return { success: false, message: "You already joined the Competition!" };
  }
  await db.participant.create({
    data: {
      email: existingUser.email,
      name: existingUser.fullname,
      referralCode: existingUser.referralCode,
      referrals: 0,
      competitionID: values.competitionID,
      prize: 0,
      position: 0,
    } as any,
  });
  const id = values.competitionID;
  const Competitiondetails = await getCompetitionDataByID(id);
  if (Competitiondetails) {
    await db.competition.update({
      where: { id: id },
      data: {
        participants: Competitiondetails.participants + 1,
      },
    });
  }
  return {
    success: true,
    message: "Joined Competition successful",
  };
};
