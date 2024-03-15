import authOptions from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";

export const getSession = async () => {
  return await getServerSession(authOptions);
};
