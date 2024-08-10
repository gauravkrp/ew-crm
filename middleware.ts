import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  const req = await request.json();
  const token = req?.headers?.authorization?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.STYTCH_PUBLIC_TOKEN as string
    );
    req.user = decoded;

    const response = NextResponse.next();
    return response;
  } catch (err) {
    return NextResponse.json({ error: "Invalid Token" });
  }
}

export const config = {
  matcher: "/api/v1/:path*",
};
