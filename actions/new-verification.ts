"use server";

import {
  getCompetitionParticipantByCompetitionIDAndEmail,
  getOngoingCompetition,
} from "@/data/competitions";
import { getUserByEmail, getUserByRefferalCode } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/prisma";

export const newVerification = async (token: string) => {
  const existingToken: any = await getVerificationTokenByToken(token);
  if (existingToken) {
    const isuserEmailVerified: any = await getUserByEmail(existingToken.email);
    if (isuserEmailVerified.emailVerified !== null) {
      return { success: true, message: "Email verified!" };
    }
  }

  if (!existingToken) {
    return { success: false, message: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { success: false, message: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { success: false, message: "Email does not exist!" };
  }

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.affiliate.update({
    where: { email: existingUser.email },
    data: {
      status: "Verified",
    },
  });
  const uplineCode = existingUser.uplineCode;
  if (uplineCode !== "null") {
    const ongoingCompetition = await getOngoingCompetition();
    if (ongoingCompetition) {
      const competitionID = ongoingCompetition.id;
      const uplineData = await getUserByRefferalCode(uplineCode);
      if (uplineData) {
        const uplineEmail = uplineData?.email;
        const isUplinedJoinedCompetition: any =
          await getCompetitionParticipantByCompetitionIDAndEmail(
            competitionID,
            uplineEmail
          );
        if (isUplinedJoinedCompetition) {
          const id = isUplinedJoinedCompetition.id;
          const new_referrals = isUplinedJoinedCompetition.referrals + 1;
          await db.participant.update({
            where: { id: id },
            data: { referrals: new_referrals },
          });
        }
      }
    }
  }

  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: true, message: "Email verified!" };
};
