// app/api/addSchool/route.js
// This is the "backend waiter" that receives form data, saves image, and inserts into DB

import { NextResponse } from "next/server";
import path from "path";                 // helps build file paths
import { writeFile } from "fs/promises"; // to save uploaded files
import { pool } from "@/lib/db";         // import our DB connection

// This function will run when user submits the form (POST request)
export async function POST(req) {
  try {
    // Get all form data from request
    const formData = await req.formData();

    // Extract fields from form
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("image");

    // Save image to /public/schoolImages
    let imageName = null;
    if (imageFile && typeof imageFile !== "string") {
      // Convert image file into buffer (binary data)
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      // Rename image with timestamp to avoid duplicate names
      imageName = Date.now() + "-" + imageFile.name;
      // Path where image will be saved
      const imagePath = path.join(process.cwd(), "public", "schoolImages", imageName);
      // Write file to the path
      await writeFile(imagePath, buffer);
    }

    // Insert data into MySQL
    const sql = `INSERT INTO schools 
                 (name, address, city, state, contact, image, email_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await pool.execute(sql, [name, address, city, state, contact, imageName, email_id]);

    // Send success response
    return NextResponse.json({ message: "School added successfully" });
  } catch (err) {
    console.error("Error adding school:", err);
    // Send error response
    return NextResponse.json({ error: "Failed to add school" }, { status: 500 });
  }
}
