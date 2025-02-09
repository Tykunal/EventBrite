"use client";
import { useEffect, useState } from "react";
import SubscribeForm from "@/components/SubscribeForm";

interface Event {
  _id: string;
  name: string;
  date: string;
  location: string;
  description?: string;
  link: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  // const [subscribedEvents, setSubscribedEvents] = useState<string[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);


  // const handleSubscription = (eventId: string) => {
  //   setSubscribedEvents((prev) => [...prev, eventId]);
  // };

  const handleViewDetails = (event: Event) => {
    if (true) { //here we may add the logic for subscribed user, if he/she has registered for that event, they may see the event directly.
      alert("Please subscribe with your email first to view details.");
    } else {
      window.open(event.link, "_blank");
    }
  };

  return (
    <main className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-transform transform hover:scale-105"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 truncate">
              {event.name}
            </h2>
            <p className="text-gray-500 mb-1">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="text-gray-500 mb-1">
              <strong>Location:</strong> {event.location}
            </p>
            {event.description && (
              <p className="text-gray-600 text-sm mt-2 line-clamp-3">
                {event.description}
              </p>
            )}
            <button
              onClick={() => handleViewDetails(event)}
              className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
            >
              View Details →
            </button>
            <SubscribeForm eventId={event._id}/>
          </div>
        ))}
      </div>
    </main>
  );
}
