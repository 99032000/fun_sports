/* eslint-disable @next/next/no-img-element */
"use client";

import { deleteEvent } from "@/lib/api";
import type { social_event, sports_type } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Key, useState } from "react";
import toast from "react-hot-toast";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const EventCard = ({
  event,
  sports_types,
}: {
  event: social_event;
  sports_types: sports_type[];
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toLocalTimeString = (timeStamp: Date) => {
    const dateStamp = new Date(timeStamp);
    return dateStamp.toLocaleString("en-AU");
  };
  const getSportsTypeName = (id: number) => {
    return sports_types.find((type) => type.id === id)?.name;
  };
  const handleDeleteOnClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const result = await deleteEvent(event.id);
    if (result.success) {
      router.refresh();
    } else {
      toast.error("fail to delete event.");
    }
    document.getElementById("event_card")?.click();
    setLoading(false);
  };
  const handleCloseOnClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    document.getElementById("event_card")?.click();
  };

  const groupDetails = (list: any) => (
    <div className="overflow-x-auto">
      <table className="table w-full table-compact">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Booked Amount</th>
          </tr>
        </thead>
        <tbody>
          {list.map(
            (
              item: {
                name: string;

                amount: string;

                booking_amount: string;
              },
              index: Key | null | undefined
            ) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.amount}</td>
                  <td>{item.booking_amount}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );

  const modalElement = () => (
    <>
      <input type="checkbox" id="event_card" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete ?
          </h3>
          <div className="modal-action">
            <div className="flex gap-4 mt-8">
              <button
                className={
                  "btn sm:btn-sm md:btn-md btn-primary w-28 text-white "
                }
                onClick={handleCloseOnClick}
              >
                No
              </button>
              <button
                className={
                  "btn sm:btn-sm md:btn-md btn-secondary w-28 text-white " +
                  (loading && " loading")
                }
                onClick={handleDeleteOnClick}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="card bg-base-100 max-w-md shadow-xl p-4 flex flex-col gap-4 w-full sm:min-w-[350px]">
      {modalElement()}
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
            <label htmlFor="event_card">
              <AiFillDelete className=" text-secondary text-2xl cursor-pointer" />
            </label>
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
          {groupDetails(event.booking_groups!)}
        </h2>
      </div>
    </div>
  );
};

export default EventCard;
