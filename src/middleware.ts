import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { stytchAPI } from "@/lib/stytch";
import { supabase } from "./utils/supabase/client";
import { VERIFICATION_STATUS } from "./user-verification.server";

export async function middleware(request: NextRequest) {
  const token = request?.headers?.get("authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }
  try {
    const data = { session_jwt: token };
    const authResponse: any = await stytchAPI.post(
      "https://api.stytch.com/v1/sessions/authenticate",
      data
    );
    const email = authResponse.data.user.emails[0].email;
    const role = authResponse.data.session?.custom_claims?.role
    const status = authResponse.data.session?.custom_claims?.status
    const { data: dbData, error } = await supabase
      .from("users")
      .select("id")
      .eq("email", email);
    const userData = dbData?.[0];
    const id = userData?.id
    if (status == VERIFICATION_STATUS.PENDING) {
      return NextResponse.json(
        { error: "You are not approved yet! Please contact admin" },
        { status: 403 }
      );
    }
    if (status == VERIFICATION_STATUS.REJECTED) {
      return NextResponse.json(
        { error: "You account is rejected by admin" },
        { status: 403 }
      );
    }

    const response = NextResponse.next();

    response.cookies.set("role", role);
    response.cookies.set("userId", id);

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/v1/approval", "/api/v1/student", "/api/v1/upload"],
};
