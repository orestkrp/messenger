import { NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { pusherServer } from "@/libs/pusher";

export async function POST(req: Request, response: NextApiResponse) {
  const data = await req.text();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return response.status(401);
  }

  const [socketId, channelName] = data
    .split("&")
    .map((str) => str.split("=")[1]);

  const presenceData = {
    user_id: session.user.email,
  };

  const auth = pusherServer.authorizeChannel(
    socketId,
    channelName,
    presenceData,
  );

  return new Response(JSON.stringify(auth));
}
