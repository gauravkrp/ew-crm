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
        { status: 401 }
      );
    }
    const { data, error } = await supabase
      .from("students")
      .select("first_name, last_name, email, phone, id, father_name, gender");
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
    const { email, gender, first_name, last_name, phone, father_name, dob } =
      requestData;
    console.log(requestData);

    const role = req.cookies.get("role")?.value;
    console.log("role: ", role);

    const { data, error } = await supabase.from("students").insert({
      first_name,
      last_name,
      email,
    });
    if (error) {
      console.log(error);

      return NextResponse.json(
        { error: "Failed to add data" },
        { status: 400 }
      );
    }

    return NextResponse.json({ students: data });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.response?.data?.error_message || error?.message,
      },
      { status: 400 }
    );
  }
}
// export async function PATCH(req: NextRequest) {
//   try {
//     const role = req.cookies.get("role")?.value;

//     if (!role || role != "admin") {
//       return NextResponse.json(
//         {
//           error: "only admin have access to get this data",
//         },
//         { status: 401 }
//       );
//     }
//     const { status, userId } = await req.json();
//     const { data, error } = await supabase
//       .from("users")
//       .update({ status })
//       .eq("id", userId);
//     if (error) {
//       return NextResponse.json(
//         { error: "Failed to update status" },
//         { status: 400 }
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     return NextResponse.json({
//       error: error?.response?.data?.error_message || error?.message,
//     });
//   }
// }