"use server";
import { signOut } from "@/auth";
import { getOnlineUsers } from "@/data/user";
import { db } from "@/lib/prisma";

export const logout = async () => {
  const existingOnlineUsers: any = await getOnlineUsers();
  if (existingOnlineUsers.length === 0) {
    await db.onlineUsers.create({
      data: {
        users: 0,
      },
    });
  } else {
    const id = existingOnlineUsers[0].id;
    const users = existingOnlineUsers[0].users;
    await db.onlineUsers.update({
      where: { id: id },
      data: {
        users: users - 1,
      },
    });
  }

  await signOut();
};
