"use server";
import { db } from "@/lib/prisma";

// Improved prize calculation with better readability.
const calculatePrize = (position: number): number => {
  if (position === 1) return 100000;
  if (position === 2) return 50000;
  if (position === 3) return 20000;
  if (position <= 10) return 5000;
  if (position <= 100) return 1000;
  return 0;
};

// Function to update participant referrals count.
export const updateCompetitionRefferals = async () => {
  const ongoingCompetition = await db.competition.findFirst({
    where: { status: "ongoing" },
  });

  if (!ongoingCompetition) return;

  const participants = await db.participant.findMany({
    where: { competitionID: ongoingCompetition.id },
  });

  if (participants.length === 0) return;

  // Sort participants by referral count
  participants.sort((a, b) => b.referrals - a.referrals);

  // Update participant referrals based on affiliate count
  for (const participant of participants) {
    const affiliateCount = await db.affiliate.count({
      where: {
        uplineCode: participant.referralCode,
        createdAt: {
          gte: new Date(ongoingCompetition.startAt),
          lte: new Date(ongoingCompetition.endAt),
        },
        status: "Verified",
      },
    });

    await db.participant.update({
      where: { id: participant.id },
      data: { referrals: affiliateCount },
    });
  }
};

// Function to update competition status and reward participants.
export const updateCompetitionStatusAndRewardParticipants = async () => {
  const notUpdatedCompetition = await db.competition.findMany({
    where: { isUpdated: false, status: "ongoing" },
  });

  if (!notUpdatedCompetition.length) return;

  const todayTimestamp = Date.now();

  // Find ongoing competition
  const ongoingCompetition = await db.competition.findFirst({
    where: { status: "ongoing" },
  });

  if (!ongoingCompetition) return;

  // Check if competition should be completed
  const endTimestamp = new Date(ongoingCompetition.endAt).getTime();
  if (todayTimestamp < endTimestamp) return;

  // Complete the competition
  await db.competition.update({
    where: { id: ongoingCompetition.id },
    data: { status: "completed" },
  });

  // Start upcoming competitions if any
  const upcomingCompetition = await db.competition.findFirst({
    where: { status: "upcoming" },
  });

  if (upcomingCompetition) {
    const startTimestamp = new Date(upcomingCompetition.startAt).getTime();
    if (todayTimestamp >= startTimestamp) {
      await db.competition.update({
        where: { id: upcomingCompetition.id },
        data: { status: "ongoing" },
      });
    }
  }

  // Fetch completed competition participants
  const participants = await db.participant.findMany({
    where: { competitionID: ongoingCompetition.id },
  });

  if (!participants.length) return;

  // Sort and reward participants based on referrals
  participants.sort((a, b) => b.referrals - a.referrals);

  for (let i = 0; i < participants.length; i++) {
    const participant = participants[i];
    const prize = calculatePrize(i + 1);

    // Count verified affiliates for the participant
    const affiliateCount = await db.affiliate.count({
      where: {
        uplineCode: participant.referralCode,
        createdAt: {
          gte: new Date(ongoingCompetition.startAt),
          lte: new Date(ongoingCompetition.endAt),
        },
        status: "Verified",
      },
    });

    // Update participant with position, referrals, and prize
    await db.participant.update({
      where: { id: participant.id },
      data: { position: i + 1, referrals: affiliateCount, prize },
    });

    // Update user's shares balance
    const user = await db.user.findUnique({ where: { email: participant.email } });
    if (user) {
      await db.user.update({
        where: { id: user.id },
        data: { shares_balance: { increment: prize } },
      });
    }
  }

  // Identify the winner
  const winners = participants.filter(p => p.position === 1);
  if (winners.length) {
    await db.competition.update({
      where: { id: ongoingCompetition.id },
      data: { winner: winners[0].name, isUpdated: true },
    });
  }
};

// Schedule to update competition status and referrals
setInterval(async () => {
  try {
    await updateCompetitionStatusAndRewardParticipants();
    await updateCompetitionRefferals();
  } catch (error) {
    console.error("Error updating competitions:", error);
  }
}, 1000);
