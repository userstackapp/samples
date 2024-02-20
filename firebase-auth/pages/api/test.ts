import { NextApiRequest, NextApiResponse } from "next";
import cookieParser from "cookie";

type VerifyResponse = {
  sessionid: string;
  appId: string;
  createdAt: string;
  domainId: string;
  email: string;
  plan: string;
  flags: { [key: string]: string };
  data: any;
};

type ErrorResponse = {
  error: string;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<VerifyResponse | ErrorResponse>
) {
  const cookies = cookieParser.parse(request.headers.cookie || "");
  const sessionCookie = cookies["_us_session"];

  if (sessionCookie) {
    const { sessionId } = JSON.parse(sessionCookie);

    const r = await fetch("https://userstack.app/api/alpha/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.USERSTACK_API_KEY}`,
      },
      body: JSON.stringify({ sessionId }),
    });

    if (r.ok) {
      const verifyResponse: VerifyResponse = await r.json();
      console.log(verifyResponse);
      response.status(200).json(verifyResponse);
    } else {
      console.error(await r.text());
    }
  }

  response.status(400).json({ error: "No session" });
}
