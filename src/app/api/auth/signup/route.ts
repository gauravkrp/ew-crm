import { stytchAPI } from "@/lib/stytch";
import { ROLE_EMPLOYEE } from "@/roles.server";
import { VERIFICATION_STATUS } from "@/user-verification.server";
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
    const passwordResponse: any = await stytchAPI.post(
      "https://api.stytch.com/v1/passwords",
      data
    );

    const authResponse: any = await stytchAPI.post(
      "https://api.stytch.com/v1/passwords/authenticate",
      data
    );
    const stytchUserId = authResponse?.data.session?.user_id;
    const authToken = authResponse?.data?.session_jwt;

    const requestData = {
      trusted_metadata: {
        role: ROLE_EMPLOYEE,
        status:VERIFICATION_STATUS.PENDING
      },
    };
    const claimsResponse: any = await stytchAPI.put(
      `https://api.stytch.com/v1/users/${stytchUserId}`,
      requestData
    );
    const { data: dbData, error } = await supabase
      .from("users")
      .insert([
        {
          email,
          first_name,
          last_name,
          status: "pending",
          phone,
          stytch_user_id: stytchUserId,
        },
      ]);
    if (error) {
      return NextResponse.json(
        { error: "Failed to add data" },
        { status: 400 }
      );
    }

    return NextResponse.json({ sessionToken: authResponse?.data?.session_jwt });
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
