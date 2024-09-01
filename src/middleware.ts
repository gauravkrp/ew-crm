import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { stytchAPI } from "@/lib/stytch";
import { supabase } from "./utils/supabase/client";

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

    const { data: dbData, error } = await supabase
      .from("users")
      .select("id, role, status")
      .eq("email", email);
    const userData = dbData?.[0];
    console.log("data: ", userData);

    const status = userData?.status;
    if (status == "pending") {
      return NextResponse.json(
        { error: "You are not approved yet! Please contact admin" },
        { status: 403 }
      );
    }
    if (status == "rejected") {
      return NextResponse.json(
        { error: "You account is rejected by admin" },
        { status: 403 }
      );
    }
    const role = userData?.role;
    const id = userData?.id;

    const response = NextResponse.next();
    // console.log(response);

    response.cookies.set("role", role);
    response.cookies.set("userId", id);

    return response;
  } catch (err: any) {
    console.log(err);

    return NextResponse.json({ error: "Invalid Token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/v1/approval", "/api/v1/student"],
};
