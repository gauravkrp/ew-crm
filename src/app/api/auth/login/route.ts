import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const requestData: any = await req.json();

  try {
    const username = process.env.STYTCH_PROJECT_ID as string;
    const password = process.env.STYTCH_SECRET as string;

    const data = {
      email: requestData?.email,
      password: requestData?.password,
      session_duration_minutes: 60 * 24, //
    };

    const config = {
      method: "post",
      url: "https://api.stytch.com/v1/passwords/authenticate",
      auth: {
        username: username,
        password: password,
      },
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response: any = await axios(config);

    console.log(response?.data);

    return NextResponse.json({ sessionToken: "hello" });
  } catch (error: any) {
    console.error(error?.response?.data?.error_message);
    return NextResponse.json(
      {
        error: error?.response?.data?.error_message || error?.message,
      },
      { status: 400 }
    );
  }
}
