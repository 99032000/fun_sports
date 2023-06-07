/* eslint-disable @next/next/no-img-element */
"use client";

import { toLocalTimeString } from "@/utility/Date";
import type { social_event } from "@prisma/client";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import ImageModal from "../dashboard/ImageModal";
import Image from "next/image";
import { event_group, bookingInfo, bookEvent } from "@/lib/api";
type props = {
  event: social_event;
  userId: string;
};

function Booking({ event, userId }: props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState<bookingInfo[]>([]);
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
  const bookInputOnchange = (id: number, e: any) => {
    const bookAmount = parseInt(e.target.value);
    if (Number.isNaN(bookAmount) || bookAmount <= 0) {
      setBookingInfo((pre) => {
        const copyPre = [...pre];
        const index = copyPre.findIndex((item) => item.id === id);
        if (index >= 0) {
          copyPre.splice(index, 1);
        }
        return copyPre;
      });
      return;
    }
    setBookingInfo((pre) => {
      const copyPre = [...pre];
      const index = copyPre.findIndex((item) => item.id === id);
      if (index < 0 && bookAmount > 0) copyPre.push({ id: id, bookAmount });
      else copyPre[index].bookAmount = bookAmount;
      return copyPre;
    });
  };
  const groupBooking = () => {
    const groups = event.booking_groups as event_group[];
    return (
      <div className="overflow-x-auto">
        <table className="table table-xs sm:table-md">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Available</th>
              <th>Price</th>
              <th>Book</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.amount - item.booking_amount}</td>
                  <td>{item.price}</td>
                  <td>
                    {
                      <input
                        type="number"
                        className="input input-bordered input-xs sm:input-sm  w-16 sm:max-w-xs input-primary"
                        min="0"
                        defaultValue={0}
                        onChange={(e) => bookInputOnchange(index, e)}
                      />
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  const bookOnClick = async () => {
    if (bookingInfo.length === 0) return;
    setLoading(true);
    const result = await bookEvent(bookingInfo, event.id);
    if (result.success) {
      setLoading(false);
      toast.success("Book was successfully 🥹");
      router.back();
    } else {
      toast.error(result.message);
      router.refresh();
    }
    setLoading(false);
  };
  return (
    <div className=" mt-4 w-full p-6 m-auto bg-white rounded-md shadow-md">
      <h1 className=" text-xl">Booking</h1>
      <div className="flex flex-col md:flex-row">
        <div className=" flex-1">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <div className="flex flex-rowitems-center gap-1 md:mt-4 mt-2">
              <h2 className=" my-auto text-sm sm:text-lg">Name:</h2>
              {event.name}
            </div>
            <div className="flex flex-row items-center gap-1 md:mt-4 mt-2">
              <h2 className=" my-auto text-sm sm:text-lg">Address:</h2>
              {event.address}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <div className="flex flex-row items-center gap-1 md:mt-4 mt-2 flex-wrap">
              <h2 className=" my-auto text-sm sm:text-lg">Date:</h2>
              {toLocalTimeString(event.date)}
            </div>
            <div className="flex flex-row items-center gap-1 md:mt-4 mt-2">
              <h2 className=" my-auto text-sm sm:text-lg">Fee:</h2>${event.fee}
            </div>
          </div>
          <div className=" md:mt-4 mt-2">
            <h1 className=" my-auto text-sm sm:text-lg">Description</h1>
            <h2 className=" mt-2 break-words whitespace-pre-wrap">
              {event.description}
            </h2>
          </div>
          <div className=" md:mt-4 mt-2">
            {event.images_url.length > 0 && (
              <div className="flex gap-4 flex-wrap">{imageList()}</div>
            )}
          </div>
        </div>
        <div className="divider md:divider-horizontal"></div>
        <div className=" flex-1">
          <h1 className=" text-xl">Booking detail</h1>
          <div className="mt-4">{groupBooking()}</div>
        </div>
      </div>
      <div className="divider"></div>

      <div className="flex sm:justify-end justify-start">
        <button
          className={
            "btn btn-primary my-8 shadow " + (loading ? " btn-disabled" : "")
          }
          onClick={bookOnClick}
        >
          {loading && <span className="loading loading-spinner"></span>}
          Book
        </button>
      </div>
    </div>
  );
}

export default Booking;
