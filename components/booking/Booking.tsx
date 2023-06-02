/* eslint-disable @next/next/no-img-element */
"use client";

import { toLocalTimeString } from "@/utility/Date";
import type { organization, sports_type, social_event } from "@prisma/client";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import ImageModal from "../dashboard/ImageModal";
import Image from "next/image";
type props = {
  event: social_event;
  userId: string;
};

function Booking({ event, userId }: props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
  return (
    <div className="">
      <div className=" mt-4 w-full p-6 m-auto bg-white rounded-md shadow-md">
        <h1 className=" text-xl">Booking</h1>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <div className="flex flex-rowitems-center gap-1 md:mt-8 mt-4">
            <h2 className=" my-auto text-sm sm:text-lg">Name:</h2>
            {event.name}
          </div>
          <div className="flex flex-row items-center gap-1 md:mt-8 mt-4">
            <h2 className=" my-auto text-sm sm:text-lg">Address:</h2>
            {event.address}
          </div>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <div className="flex flex-row items-center gap-1 md:mt-8 mt-4">
            <h2 className=" my-auto text-sm sm:text-lg">Date:</h2>
            {toLocalTimeString(event.date)}
          </div>
          <div className="flex flex-row items-center gap-1 md:mt-8 mt-4">
            <h2 className=" my-auto text-sm sm:text-lg">Fee:</h2>${event.fee}
          </div>
        </div>
        <div className=" md:mt-8 mt-4">
          <h1>Description</h1>
          <h2 className=" mt-2 break-words">{event.description}</h2>
        </div>
        <div className=" md:mt-8 mt-4">
          {event.images_url.length > 0 && (
            <div className="flex gap-4 flex-wrap">{imageList()}</div>
          )}
        </div>
        <div className="flex sm:justify-end justify-start">
          <button
            className={
              "btn btn-primary mt-8 shadow" +
              (loading ? " btn-disabled loading" : "")
            }
          >
            Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default Booking;
