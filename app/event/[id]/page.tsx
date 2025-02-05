'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`/api/events`)
      .then((res) => res.json())
      .then((data) => {
        const eventDetails = data.find((item) => item._id === id);
        setEvent(eventDetails);
      });
  }, [id]);

  return (
    event && (
      <div className="p-6">
        <h1 className="text-2xl font-bold">{event.name}</h1>
        <p>{event.date} - {event.location}</p>
        <p>{event.description}</p>
        <a
          href={event.link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-4 py-2 mt-4 inline-block rounded"
        >
          Buy Tickets
        </a>
      </div>
    )
  );
}
