import { NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { pusherServer } from "@/libs/pusher";
import authOptions from "../../auth/[...nextauth]/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request, response: NextApiResponse) {
  const data = await req.text();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
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

  return NextResponse.json(auth);
}
