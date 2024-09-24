"use server";
import { getOnlineUsers } from "@/data/user";
import { db } from "@/lib/prisma";

export const OnlineUsers = async () => {
  try {
    const existingOnlineUsers = await getOnlineUsers();
    if (existingOnlineUsers) {
      return {
        success: true,
        message: "Data Fetched!",
        users: existingOnlineUsers,
      };
    } else {
      return {
        success: false,
        message: "Data not Fetched!",
        users: null,
      };
    }
  } catch (error) {
    return { success: false, message: "An error occured, try again!" };
  }
};

export const UpdateOnlineUsers = async (values: any) => {
  const existingOnlineUsers: any = await getOnlineUsers();
  if (existingOnlineUsers.length === 0) {
    await db.onlineUsers.create({
      data: {
        users: 1,
      },
    });
  } else {
    const id = existingOnlineUsers[0].id;
    const users = existingOnlineUsers[0].users;
    if ((values.type = "login")) {
      await db.onlineUsers.update({
        where: { id: id },
        data: {
          users: users + 1,
        },
      });
    } else {
      await db.onlineUsers.update({
        where: { id: id },
        data: {
          users: users - 1,
        },
      });
    }
  }
};
