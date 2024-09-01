import { stytchAPI } from "@/lib/stytch";
import { supabase } from "@/utils/supabase/client";
import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
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
    const { data, error } = await supabase
      .from("students")
      .select(
        "first_name, last_name, email, mobile_number, id, father_name, gender"
      )
      .order("id", { ascending: false });
    if (error) {
      return NextResponse.json(
        { error: "Failed to add data" },
        { status: 400 }
      );
    }

    return NextResponse.json({ students: data });
  } catch (error: any) {
    return NextResponse.json({
      error: error?.response?.data?.error_message || error?.message,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const requestData: any = await req.json();

    let {
      email,
      gender,
      first_name,
      last_name,
      mobile_number,
      father_name,
      dob,
    } = requestData;

    const userId = req.cookies.get("userId")?.value;
    if (!(mobile_number as string).startsWith("+")) {
      mobile_number = `+91${mobile_number}`;
    }
    const { data, error } = await supabase.from("students").insert({
      first_name,
      last_name,
      email,
      father_name,
      gender,
      mobile_number,
      created_by: userId,
      dob,
    });
    if (error) {
      console.log(error);

      return NextResponse.json(
        { error: "Failed to add data" },
        { status: 400 }
      );
    }

    return NextResponse.json({ students: data }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.response?.data?.error_message || error?.message,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const requestData: any = await req.json();

    let {
      id,
      email,
      gender,
      first_name,
      last_name,
      mobile_number,
      father_name,
      dob,
    } = requestData;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (!(mobile_number as string).startsWith("+")) {
      mobile_number = `+91${mobile_number}`;
    }
    const userId = req.cookies.get("userId")?.value;

    // Perform the update
    const { data, error } = await supabase
      .from("students")
      .update({
        first_name,
        last_name,
        email,
        father_name,
        gender,
        mobile_number,
        dob,
        updated_by: userId,
      })
      .eq("id", id); // Update the record where the id matches

    if (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Failed to update data" },
        { status: 400 }
      );
    }

    return NextResponse.json({ updatedStudent: data });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.response?.data?.error_message || error?.message,
      },
      { status: 400 }
    );
  }
}
