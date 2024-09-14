import axios from "axios";
import { NextResponse } from "next/server";
import { stytchAPI } from "@/lib/stytch";

export async function POST(req: Request) {
  const requestData: any = await req.json();

  try {
    const data = {
      email: requestData?.email,
      password: requestData?.password,
      session_duration_minutes: 60 * 24, //
    };

    const response: any = await stytchAPI.post(
      "https://api.stytch.com/v1/passwords/authenticate",
      data
    );

    return NextResponse.json({ sessionToken: response?.data?.session_jwt });
  } catch (error: any) {
    const statusCode = error?.response?.status || 500;
    return NextResponse.json(
      {
        error: error?.response?.data?.error_message || error?.message,
      },
      { status: statusCode }
    );
  }
}
