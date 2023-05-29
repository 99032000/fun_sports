/* eslint-disable @next/next/no-img-element */
"use client";

import { event_group } from "@/lib/api";
import { hoursList, minsList } from "@/utility/Date";
import type { organization, social_event, sports_type } from "@prisma/client";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Datepicker from "react-tailwindcss-datepicker";
import UpdateEventGroupDetails from "./UpdateEventGroupDetail";

type props = {
  userId: string;
  organizations: organization[];
  sports_types: sports_type[];
};

//? supabase upload image
// {data: null, error: {…}}

function UpdateEvent({ event }: { event: social_event }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const nextMonth = new Date();
  nextMonth.setDate(nextMonth.getDate() + 29);
  const [date, setDate] = useState<{
    startDate: Date | null;
    endDate: Date | null;
  }>({
    startDate: null,
    endDate: null,
  });
  const [name, setName] = useState("");
  const [group, setGroup] = useState<event_group[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLSelectElement>(null);
  const minRef = useRef<HTMLSelectElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const venueRef = useRef<HTMLInputElement>(null);
  const feeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const time = new Date(event.date);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  useEffect(() => {
    nameRef.current!.value = event.name;
    addressRef.current!.value = event.address;
    venueRef.current!.value = event.venue_name || "";
    feeRef.current!.value = event.fee!.toString();
    descriptionRef.current!.value = event.description || "";

    setDate({
      startDate: time,
      endDate: time,
    });
  }, [event]);
  const handleDateChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setDate(newValue);
  };

  const eventInfo = () => (
    <>
      <div className="grid grid-cols-1 grid-flow-row-dense auto-cols-max gap-4 lg:grid-cols-2">
        <div className="flex flex-row gap-4 md:mt-8 mt-4">
          <h2 className=" my-auto text-sm sm:text-lg">Name:*</h2>
          <input
            type="address"
            className="input input-bordered w-full input-sm max-w-sm input-primary"
            ref={nameRef}
          />
        </div>

        <div className="flex flex-row gap-4 md:mt-8 mt-4 flex-wrap">
          <h2 className=" my-auto text-sm sm:text-lg ">Date:*</h2>
          <Datepicker
            value={date}
            onChange={handleDateChange}
            asSingle={true}
            useRange={false}
            displayFormat={"DD/MM/YYYY"}
            inputClassName="select w-full max-w-fit sm:max-w-[300px] md:max-w-[350px] select-primary select-sm"
            toggleClassName=" hidden"
            containerClassName="relative"
            minDate={yesterday}
            maxDate={nextMonth}
          />
        </div>
        <div className="flex flex-row gap-4 md:mt-8 mt-4 flex-wrap">
          <h2 className=" my-auto text-sm sm:text-lg ">Time:*</h2>
          <div className="flex gap-4">
            <select
              className="select w-full max-w-fit select-primary select-sm"
              defaultValue={hours}
              ref={hourRef}
            >
              <option disabled value={-1}>
                Select hours
              </option>
              {hoursList.map((hour, index) => (
                <option key={index} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
            <select
              className="select w-full max-w-fit select-primary select-sm"
              defaultValue={minutes}
              ref={minRef}
            >
              <option disabled value={-1}>
                Select mins
              </option>
              {minsList.map((min, index) => (
                <option key={index} value={min}>
                  {min}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-row gap-4 md:mt-8 mt-4">
          <h2 className=" my-auto text-sm sm:text-lg">Address:*</h2>
          <input
            type="address"
            className="input input-bordered w-full input-sm max-w-sm input-primary"
            ref={addressRef}
          />
        </div>
        <div className="flex flex-row gap-4 md:mt-8 mt-4">
          <h2 className=" my-auto text-sm sm:text-lg">Venue name:</h2>
          <input
            type="text"
            className="input input-bordered w-full input-sm max-w-sm input-primary"
            ref={venueRef}
          />
        </div>
        <div className="flex flex-row gap-4 md:mt-8 mt-4">
          <h2 className=" my-auto text-sm sm:text-lg">Fee:*</h2>
          <input
            type="number"
            className="input input-bordered w-full input-sm max-w-sm input-primary"
            min="0"
            ref={feeRef}
          />
        </div>
        <div className="flex flex-row gap-4 mt-8 flex-wrap">
          <h2 className=" my-auto">Description:*</h2>
          <textarea
            placeholder="Describe your organization"
            className="textarea textarea-bordered textarea-lg w-full max-w-lg textarea-primary"
            ref={descriptionRef}
          ></textarea>
        </div>
      </div>
      <UpdateEventGroupDetails group={group} setGroup={setGroup} />
    </>
  );
  return (
    <div className="">
      <div className="text-sm md:text-lg breadcrumbs">
        <ul>
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <a>Event</a>
          </li>
          <li>
            <a>New Event</a>
          </li>
        </ul>
      </div>
      <div className=" mt-4 w-full p-6 m-auto bg-white rounded-md shadow-md">
        <h1 className=" text-xl">New Event</h1>
        {eventInfo()}

        <div className="flex sm:justify-end justify-start">
          <button
            className={
              "btn btn-primary mt-8 shadow" +
              (loading ? " disabled loading" : "")
            }
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateEvent;
