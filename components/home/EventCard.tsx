/* eslint-disable @next/next/no-img-element */
import type { event } from "./Home";
import { toLocalTimeString } from "@/utility/Date";
function EventCard({ event }: { event: event }) {
  return (
    <div className="card w-80 sm:w-3/5 max-w-3xl shadow-xl bg-base-100 bg-opacity-90">
      <div className="card-body">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <h2 className="card-title">{event.name}</h2>
            {event.organization?.avatar_url && (
              <img
                src={event.organization.avatar_url}
                alt="avatar"
                className="w-8 h-8 rounded-full"
              />
            )}
          </div>
          <div className="badge badge-secondary">{event.sports_type.name}</div>
        </div>
        <div className="flex justify-between gap-2 flex-wrap">
          <div className="flex gap-1">
            <h1>Address:</h1>
            <h2>{event.address}</h2>
          </div>
          <div className="flex gap-1">
            <h1>Venue:</h1>
            <h2>{event.venue_name}</h2>
          </div>
        </div>
        <div className="flex justify-between gap-2 flex-wrap">
          <div className="flex gap-1">
            <h1>Date:</h1>
            <h2>{toLocalTimeString(event.date)}</h2>
          </div>
          <div className="flex gap-1">
            <h1>Fee:</h1>
            <h2>${event.fee}</h2>
          </div>
        </div>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-accent">Book Now</button>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
