import { stytchAPI } from "@/lib/stytch";
import { supabase } from "@/utils/supabase/client";
import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const role = req.cookies.get("role")?.value;
    console.log("role: ", role);

    if (!role || role != "admin") {
      return NextResponse.json(
        {
          error: "only admin have access to get this data",
        },
        { status: 403 } // 403 -> Authorization error
      );
    }
    const { data, error } = await supabase
      .from("users")
      .select("first_name, last_name, email, phone, id")
      .eq("status", "pending");
    if (error) {
      return NextResponse.json(
        { error: "Failed to add data" },
        { status: 400 }
      );
    }

    return NextResponse.json({ users: data });
  } catch (error: any) {
    return NextResponse.json({
      error: error?.response?.data?.error_message || error?.message,
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const role = req.cookies.get("role")?.value;

    if (!role || role != "admin") {
      return NextResponse.json(
        {
          error: "only admin have access to get this data",
        },
        { status: 403 }
      );
    }
    const { status, userId } = await req.json();
    const { data, error } = await supabase
      .from("users")
      .update({ status })
      .eq("id", userId);
    if (error) {
      return NextResponse.json(
        { error: "Failed to update status" },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({
      error: error?.response?.data?.error_message || error?.message,
    });
  }
}
