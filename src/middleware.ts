import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { stytchAPI } from "@/lib/stytch";
import { supabase } from "./utils/supabase/client";

// Check status
export async function middleware(request: NextRequest) {
  const token = request?.headers?.get("authorization")?.split(" ")[1];
  // console.log("token: ", token);

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

    const { data: dbData, error } = await supabase
      .from("users")
      .select("role")
      .eq("email", email);
    const role = dbData?.[0]?.role;
    const response = NextResponse.next();
    // console.log(response);

    response.cookies.set("role", role);
    return response;
  } catch (err: any) {
    console.log(err);

    return NextResponse.json({ error: "Invalid Token" });
  }
}

export const config = {
  matcher: ["/api/v1/approval", "/api/v1/student"],
};
