// app/api/getSchools/route.js
import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

// This function runs when someone visits /api/getSchools
export async function GET() {
  try {
    // Select only the fields we need
    const [rows] = await pool.execute(
      "SELECT id, name, address, city, image FROM schools"
    );

    // Return them as JSON
    return NextResponse.json(rows);
  } catch (err) {
    console.error("Error fetching schools:", err);
    return NextResponse.json(
      { error: "Failed to fetch schools" },
      { status: 500 }
    );
  }
}
