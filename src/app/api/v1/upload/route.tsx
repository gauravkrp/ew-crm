import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import * as XLSX from "xlsx";
import { parse } from "csv-parse/sync";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase/client";

const UPLOAD_DIR = path.resolve(process.env.ROOT_PATH ?? "", "public/uploads");

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const body = Object.fromEntries(formData);
    const file = (body.file as Blob) || null;

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = (body.file as File).name;
      const fileExtension = path.extname(fileName).toLowerCase();

      let jsonData: any[] = [];

      if (fileExtension === ".xlsx" || fileExtension === ".xls") {
        const workbook = XLSX.read(buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      } else if (fileExtension === ".csv") {
        const csvData = buffer.toString();
        jsonData = parse(csvData, {
          columns: true,
          skip_empty_lines: true,
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "Only Excel and CSV files are supported.",
        });
      }

      const userId = req.cookies.get("userId")?.value;

      const formattedData = jsonData.map((record: any) => ({
        first_name: record["STUDENT NAME"].split(" ")[0],
        last_name: record["STUDENT NAME"].split(" ")[1] || "",
        email: record["EMAIL"],
        father_name: record["FATHER NAME"],
        gender: record["GENDER"]?.toLowerCase(),
        mobile_number: record["MOBILE"],
        dob: record["DOB"],
        created_by: userId,
      }));
      console.log(formattedData);

      const { data, error } = await supabase
        .from("students")
        .insert(formattedData);

      if (error) {
        console.log(error);
        return NextResponse.json(
          { error: "Failed to add data" },
          { status: 400 }
        );
      }

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({
        success: false,
        message: "No file uploaded",
      });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.response?.data?.error_message || error?.message },
      { status: 500 }
    );
  }
};
