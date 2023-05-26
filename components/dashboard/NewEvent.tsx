/* eslint-disable @next/next/no-img-element */
"use client";

import { createEvent, createEventBody, event_group } from "@/lib/api";
import { hoursList, minsList } from "@/utility/Date";
import type { organization, sports_type } from "@prisma/client";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Datepicker from "react-tailwindcss-datepicker";
import EventGroupDetails from "./EventGroupDetails";

type props = {
  userId: string;
  organizations: organization[];
  sports_types: sports_type[];
};

//? supabase upload image
// {data: null, error: {…}}

function NewEvent({ userId, organizations, sports_types }: props) {
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
  const [sportTypeValue, setSportTypeValue] = useState(-1);
  const [group, setGroup] = useState<event_group[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const orgRef = useRef<HTMLSelectElement>(null);
  const hourRef = useRef<HTMLSelectElement>(null);
  const minRef = useRef<HTMLSelectElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const venueRef = useRef<HTMLInputElement>(null);
  const feeRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setDate(newValue);
  };

  const handleOrganizationSelectOnChange = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const org = organizations.find(
      (item) => item.id === parseInt(e.target.value)
    );
    if (org) {
      setName(org.name);
      setSportTypeValue(org.sports_typeId);
    }
  };
  const handleSaveButtonOnClick = async () => {
    const hours = parseInt(hourRef.current!.value);
    const mins = parseInt(minRef.current!.value);
    const address = addressRef.current!.value;
    const fee = parseInt(feeRef.current!.value);
    const org = organizations.find(
      (org) => org.id === parseInt(orgRef.current!.value)
    );
    // form validation
    if (!org) {
      toast.error("Please select organization");
      return;
    }
    if (name.length === 0) {
      toast.error("Please enter event name");
      return;
    }
    if (!date.startDate) {
      toast.error("Please enter event date");
      return;
    }
    if (hours < 0 || mins < 0) {
      toast.error("Please enter time");
      return;
    }
    if (address.length === 0) {
      toast.error("Please enter address");
      return;
    }
    if (Number.isNaN(fee) || fee < 0) {
      toast.error("make sure the fee is greater or equals to  zero");
      return;
    }

    if (group.length === 0) {
      toast.error("please add a group");
      return;
    }
    for (let item of group) {
      if (item.name.length < 1) {
        toast.error("each group must have a name");
        return;
      }
      if (item.amount < 1) {
        toast.error("amount must be greater than 0");
        return;
      }
    }
    // create event start
    setLoading(true);
    console.log(date.startDate);
    const timeStamp = new Date(`${date.startDate} ${hours}:${mins}`);
    console.log(timeStamp);
    const body: createEventBody = {
      ownerId: userId,
      organizationId: org.id,
      name,
      address,
      venue_name:
        venueRef.current!.value === "" ? undefined : venueRef.current!.value,
      date: timeStamp,
      booking_groups: group,
      sports_typeId: sportTypeValue,
      fee,
    };
    const result = await createEvent(body);
    console.log(result);
    if (result.success) {
      setLoading(false);
      toast.success("event created successfully");
      router.replace("/dashboard/event");
      return;
    }
    if (result.error) toast.error("failed to create event");
    setLoading(false);
  };

  const eventInfo = () => (
    <>
      <div className="grid grid-cols-1 grid-flow-row-dense auto-cols-max gap-4 lg:grid-cols-2">
        {organizations.length > 0 && (
          <div className="flex flex-row gap-4 mt-8">
            <h2 className=" my-auto text-sm sm:text-lg">Organization:*</h2>
            <select
              className="select w-full max-w-max sm:max-w-[300px] md:max-w-[350px] select-primary select-sm"
              defaultValue={-1}
              ref={orgRef}
              onChange={handleOrganizationSelectOnChange}
            >
              <option disabled value={-1}>
                Choose a organization
              </option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex flex-row gap-4 md:mt-8 mt-4">
          <h2 className=" my-auto text-sm sm:text-lg">Name:*</h2>
          <input
            type="address"
            className="input input-bordered w-full input-sm max-w-sm input-primary"
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
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
              defaultValue={-1}
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
              defaultValue={-1}
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
          <h2 className=" my-auto text-sm sm:text-lg">Sports_type:*</h2>
          <select
            className="select w-full max-w-fit sm:max-w-[300px] md:max-w-[350px] select-primary select-sm"
            disabled={true}
            value={sportTypeValue}
          >
            <option disabled value={-1}>
              Choose a sport
            </option>
            {sports_types.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.name}
              </option>
            ))}
          </select>
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
      </div>
      <EventGroupDetails group={group} setGroup={setGroup} />
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
            onClick={handleSaveButtonOnClick}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewEvent;
