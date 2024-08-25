// import { NextResponse } from "next/server";
// import formidable, { File } from "formidable";
// import { read, utils } from "xlsx";
// import { createClient } from "@supabase/supabase-js";
// import fs from "fs/promises"; // Use fs/promises for async operations
// import { NextApiRequest } from "next";
// import { supabase } from "@/utils/supabase/client";

import { NextResponse } from "next/server";

export const GET = () => {
  return NextResponse.json({ message: "Test" });
};
// // Initialize Supabase client
// // const supabase = createClient(
// //   process.env.NEXT_PUBLIC_SUPABASE_URL || '',
// //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
// // );

// // Disable Next.js default body parser
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// async function parseForm(
//   req: NextApiRequest
// ): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
//   const form = new formidable.IncomingForm();
//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) reject(err);
//       resolve({ fields, files });
//     });
//   });
// }

// export async function POST(req: NextApiRequest) {
//   try {
//     const { files } = await parseForm(req);

//     // Extract the file safely
//     const fileArray = files.file as File[]; // Formidable returns an array for multiple files
//     const file = Array.isArray(fileArray) ? fileArray[0] : fileArray; // Get the first file if it's an array

//     if (!file) {
//       return NextResponse.json(
//         { message: "No file uploaded" },
//         { status: 400 }
//       );
//     }

//     // Check if the file is an Excel file
//     const mimeType = file.mimetype || "";
//     if (!mimeType.includes("excel") && !mimeType.includes("spreadsheetml")) {
//       return NextResponse.json(
//         { message: "Invalid file type. Please upload an Excel file." },
//         { status: 400 }
//       );
//     }

//     // Read the Excel file asynchronously
//     try {
//       const filePath = file.filepath; // Access the file path depending on the environment
//       const fileBuffer = await fs.readFile(filePath); // Async read
//       const workbook = read(fileBuffer, { type: "buffer" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const jsonData = utils.sheet_to_json(worksheet);

//       // Validate JSON data
//       const validEntries = jsonData.filter(
//         (row: any) => row.first_name && row.last_name && row.email
//       );

//       if (validEntries.length === 0) {
//         return NextResponse.json(
//           { message: "No valid entries found in the Excel file." },
//           { status: 400 }
//         );
//       }

//       // Insert valid entries into Supabase asynchronously
//       const { data, error } = await supabase
//         .from("students")
//         .insert(validEntries);

//       if (error) {
//         console.error("Supabase Insertion Error:", error);
//         return NextResponse.json(
//           { message: "Error inserting data into Supabase", error },
//           { status: 500 }
//         );
//       }

//       return NextResponse.json(
//         { message: "Data inserted successfully", data },
//         { status: 200 }
//       );
//     } catch (fileError) {
//       console.error("File Processing Error:", fileError);
//       return NextResponse.json(
//         { message: "Error processing the file", error: fileError },
//         { status: 500 }
//       );
//     }
//   } catch (error) {
//     console.error("General Error:", error);
//     return NextResponse.json(
//       { message: "Error processing the request", error },
//       { status: 500 }
//     );
//   }
// }
