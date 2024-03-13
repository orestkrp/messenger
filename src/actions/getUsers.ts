import { getSession } from "@/actions/getSession";
import { prismaClient } from "@/libs/prismadb";

export const getUsers = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return [];
    }

    const users = prismaClient.user.findMany({
      orderBy: { createdAt: "desc" },
      where: { NOT: { email: session.user.email } },
    });

    if (users) {
      return users;
    }

    return [];
  } catch (error) {
    console.log("Something went wrong with getting users");
    return [];
  }
};
