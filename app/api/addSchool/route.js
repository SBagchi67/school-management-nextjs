// app/api/addSchool/route.js
// Backend API to receive form data, upload image to Cloudinary, and insert into MySQL

import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import cloudinary from "@/lib/cloudinary"; // 👈 import Cloudinary config

export async function POST(req) {
  try {
    // Get all form data from request
    const formData = await req.formData();

    // Extract fields
    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const imageFile = formData.get("image");

    let imageUrl = null;

    // ✅ Upload image to Cloudinary (instead of saving to public folder)
    if (imageFile && typeof imageFile !== "string") {
      const buffer = Buffer.from(await imageFile.arrayBuffer());

      const uploaded = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "schoolImages" }, (error, result) => {
            if (error) reject(error);
            else resolve(result);
          })
          .end(buffer); // send file buffer to Cloudinary
      });

      imageUrl = uploaded.secure_url; // Store full Cloudinary URL
    }

    // Insert data into MySQL (store Cloudinary URL instead of local filename)
    const sql = `INSERT INTO schools 
                 (name, address, city, state, contact, image, email_id)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await pool.execute(sql, [
      name,
      address,
      city,
      state,
      contact,
      imageUrl,
      email_id,
    ]);

    return NextResponse.json({ message: "School added successfully" });
  } catch (err) {
    console.error("Error adding school:", err);
    return NextResponse.json({ error: "Failed to add school" }, { status: 500 });
  }
}
