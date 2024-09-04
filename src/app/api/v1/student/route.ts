import { stytchAPI } from "@/lib/stytch";
import { getPermissions } from "@/roles.server";
import { supabase } from "@/utils/supabase/client";
import axios from "axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const role = req.cookies.get("role")?.value as string;
    if (getPermissions(role)?.student_leads?.READ == false) {
      return NextResponse.json(
        {
          error: "You are not allowed to get this data",
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
    const role = req.cookies.get("role")?.value as string;
    if (getPermissions(role)?.student_leads?.WRITE == false) {
      return NextResponse.json(
        {
          error: "You are not allowed to Write data",
        },
        { status: 403 }
      );
    }
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
    if (!(mobile_number as string)?.startsWith("+")) {
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

    const role = req.cookies.get("role")?.value as string;
    if (getPermissions(role)?.student_leads?.UPDATE == false) {
      return NextResponse.json(
        {
          error: "You are not allowed to Update data",
        },
        { status: 403 }
      );
    }
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

    if (!(mobile_number as string)?.startsWith("+")) {
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

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    const integerId = id ? parseInt(id, 10) : NaN;
    if (isNaN(integerId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const role = req.cookies.get("role")?.value as string;
    if (getPermissions(role)?.student_leads?.DELETE == false) {
      return NextResponse.json(
        {
          error: "You are not allowed to Update data",
        },
        { status: 403 }
      );
    }
    

    const { data, error } = await supabase
      .from("students")
      .delete()
      .eq("id", integerId);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update data" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "data deleted" });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.response?.data?.error_message || error?.message,
      },
      { status: 400 }
    );
  }
}
