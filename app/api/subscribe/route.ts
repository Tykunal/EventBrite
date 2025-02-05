import connectDB from "@/lib/database";
import Subscription from "@/lib/models/Subscription";
import { NextResponse } from "next/server";
import Event from "@/lib/models/Event";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, eventId } = await req.json();

    if (!email || !eventId) {
      return NextResponse.json({ error: "Email and Event ID are required." }, { status: 400 });
    }
    const event = await Event.findOne({_id: eventId});
    // Prevent duplicate subscriptions
    const existingSubscription = await Subscription.findOne({ email, eventId });
    if (existingSubscription) {
      return NextResponse.json({ message: "Already subscribed!", link: event.link }, { status: 409 });
    }

    // Create a new subscription
    const newSubscription = await Subscription.create({ email, eventId });
    return NextResponse.json({ message: "Subscription successful!", subscription: newSubscription, link: event.link }, { status: 201 });
  } catch (error) {
    console.error("Subscription error:", error);
    return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 });
  }
}
