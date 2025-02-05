import connectDB from "@/lib/database";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("Starting the DB connection!");
  await connectDB();
  console.log("Connection finished!");

  return NextResponse.json({ message: "Connected" }, { status: 200 });
}
