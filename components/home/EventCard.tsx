/* eslint-disable @next/next/no-img-element */
"use client";
import { AiOutlineCheckCircle } from "react-icons/ai";
import type { eventHome } from "./Home";
import { toLocalTimeString } from "@/utility/Date";
import Link from "next-intl/link";
import { useTranslations } from "next-intl";

function EventCard({ event }: { event: eventHome }) {
  const t = useTranslations("home.book");
  return (
    <div className="card w-full md:w-3/5 max-w-3xl shadow-xl bg-base-100 bg-opacity-90">
      <div className="card-body">
        <div className="flex justify-between items-center flex-wrap gap-4">
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
          <div className="flex gap-1">
            <div className="badge badge-secondary">
              {event.sports_type.name}
            </div>
            {event.organization?.is_verified && (
              <div className="badge badge-primary">
                {"verified"}
                <AiOutlineCheckCircle />
              </div>
            )}
          </div>
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
          <Link href={`/booking/${event.id}`}>
            <button className="btn btn-accent">{t("book")}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventCard;
