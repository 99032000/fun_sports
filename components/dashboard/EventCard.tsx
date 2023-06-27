/* eslint-disable @next/next/no-img-element */
"use client";

import { event_group } from "@/lib/api";
import type { social_booking, social_event, sports_type } from "@prisma/client";
import Image from "next/image";
import Link from "next-intl/link";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import ImageModal from "./modals/ImageModal";
import { toLocalTimeString } from "@/utility/Date";
import EventCardTable from "./forms/EventCardTable";
import EventCardModal from "./modals/EventCardModal";
import EventCardViewBookModal from "./modals/EventCardViewBookModal";

const EventCard = ({
  event,
  sports_types,
}: {
  event: social_event & {
    Social_booking: (social_booking & {
      user: {
        name: string;
      };
    })[];
  };
  sports_types: sports_type[];
}) => {
  const getSportsTypeName = (id: number) => {
    return sports_types.find((type) => type.id === id)?.name;
  };

  const groupDetails = (list: event_group[]) => (
    <div className="overflow-x-auto">
      <EventCardTable list={list} />
    </div>
  );

  const imageList = () =>
    event.images_url.map((url, index) => (
      <div key={index}>
        <ImageModal url={url} />
        <label htmlFor={url}>
          <Image
            src={url}
            alt="image"
            width={128}
            height={128}
            className="rounded-xl "
          />
        </label>
      </div>
    ));
  const deleteButtonOnClick = () => {
    const element = document.getElementById(`${event.id}+"event_card"`) as any;
    element.showModal();
  };
  const viewButtonOnClick = () => {
    const element = document.getElementById(`${event.id}viewBook`) as any;
    element.showModal();
  };
  return (
    <div className="card bg-base-100 max-w-md shadow-xl p-4 flex flex-col gap-4 w-full sm:min-w-[350px]">
      <EventCardModal id={event.id} />
      <EventCardViewBookModal
        eventId={event.id}
        socialBookings={event.Social_booking}
      />
      {}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <h1 className=" text-2xl my-auto">{event.name}</h1>
        </div>
        <div className="flex gap-8 justify-end">
          <div className="tooltip tooltip-primary" data-tip="Edit">
            <Link
              href={{
                pathname: `/dashboard/event/update-event`,
                query: { id: event.id },
              }}
            >
              <AiFillEdit className=" text-primary text-2xl cursor-pointer" />
            </Link>
          </div>
          <div className="tooltip tooltip-secondary" data-tip="Delete">
            <AiFillDelete
              className=" text-secondary text-2xl cursor-pointer"
              onClick={deleteButtonOnClick}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-4">
        <h1>Sport type</h1>
        <h2>{getSportsTypeName(event.sports_typeId)}</h2>
      </div>
      <div className="flex justify-between gap-4">
        <h1>Address</h1>
        <h2>{event.address}</h2>
      </div>
      <div className="flex justify-between gap-4">
        <h1>Time</h1>
        <h2>{toLocalTimeString(event.date)}</h2>
      </div>
      <div className="flex justify-between gap-4">
        <h1>Venue name</h1>
        <h2>{event.venue_name}</h2>
      </div>
      <div className="flex justify-between gap-4">
        <h1>Fee</h1>
        <h2>${event.fee}</h2>
      </div>
      <div className="">
        <h1>Description</h1>
        <h2 className=" mt-2 break-words">{event.description}</h2>
      </div>
      <div className="">
        <h1>Group detail</h1>
        <h2 className=" mt-2 break-words">
          {groupDetails(event.booking_groups! as event_group[])}
        </h2>
      </div>
      {event.images_url.length > 0 && (
        <div className="flex gap-4 flex-wrap">{imageList()}</div>
      )}
      <button className="btn btn-primary" onClick={viewButtonOnClick}>
        View bookings
      </button>
    </div>
  );
};

export default EventCard;
