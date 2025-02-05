import connectDB from "@/lib/database";
import Event from "@/lib/models/Event";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find({}).lean();
    if(events.length < 1){
      console.error("Tickets are not getting fetched.");
      return NextResponse.json({ error: "Tickets are not in db." }, { status: 404 });
    }
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
