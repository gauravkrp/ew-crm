import { stytchAPI } from "@/lib/stytch";
import { supabase } from "@/utils/supabase/client";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const requestData: any = await req.json();
  const { email, password, first_name, last_name, phone } = requestData;

  const data: any = {
    email: email,
    password: password,
    session_duration_minutes: 60 * 24, //
  };
  try {
    const authResponse: any = await stytchAPI.post(
      "https://api.stytch.com/v1/passwords",
      data
    );

    const { data: dbData, error } = await supabase
      .from("users")
      .insert([{ email, first_name, last_name, status: "pending", phone }]);
    if (error) {
      return NextResponse.json(
        { error: "Failed to add data" },
        { status: 400 }
      );
    }

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
