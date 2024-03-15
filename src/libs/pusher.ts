import PusherServer from "pusher";
import PusherServerClient from "pusher-js";

export const pusherServer = new PusherServer({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: "eu",
  useTLS: true,
});

export const pusherClient = new PusherServerClient(
  process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
  {
    cluster: "eu",
    channelAuthorization: {
      endpoint: "/api/pusher/auth",
      transport: "ajax",
    },
  },
);
