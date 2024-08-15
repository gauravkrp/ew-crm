import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { stytchAPI } from "@/lib/stytch";
import { supabase } from "./utils/supabase/client";

export async function middleware(request: NextRequest) {
  console.log("req");
  // const req = await request.json();
  const token = request?.headers?.get("authorization")?.split(" ")[1];

  // const token = req?.headers?.authorization?.split(" ")[1];
  // console.log(token);

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }
  try {
    console.log("hello");
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
    console.log(dbData?.[0]?.role);
    const role = dbData?.[0]?.role;
    const response = NextResponse.next();
    console.log(dbData);

    response.cookies.set("role", role);
    return response;
  } catch (err: any) {
    console.log(err);

    return NextResponse.json({ error: "Invalid Token" });
  }
}

export const config = {
  matcher: ["/api/v1/approval"],
};
