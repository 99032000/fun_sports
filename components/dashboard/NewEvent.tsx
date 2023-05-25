/* eslint-disable @next/next/no-img-element */
"use client";
import { upsertOrganization, upsertOrganizationBody } from "@/lib/api";
import { hoursList, minsList } from "@/utility/Date";
import type { organization, sports_type } from "@prisma/client";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import Datepicker from "react-tailwindcss-datepicker";

type props = {
  userId: string;
  organizations: organization[];
  sports_types: sports_type[];
};
type Group = {
  name: string;
  amount: number;
};
//? supabase upload image
// {data: null, error: {…}}

function NewEvent({ userId, organizations, sports_types }: props) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  const [loading, setLoading] = useState(false);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const nextMonth = new Date();
  nextMonth.setDate(nextMonth.getDate() + 29);
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [group, setGroup] = useState<Group[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const sportsTypeRef = useRef<HTMLSelectElement>(null);
  const hourRef = useRef<HTMLSelectElement>(null);
  const minRef = useRef<HTMLSelectElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const venueRef = useRef<HTMLInputElement>(null);
  const feeRef = useRef<HTMLInputElement>(null);

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };

  const handleGroupAddOnClick = () => {
    setGroup((pre) => [
      ...pre,
      {
        name: "",
        amount: 0,
      },
    ]);
  };
  const handleGroupName = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    setGroup((pre) => {
      pre[index].name = e.target.value;
      return pre;
    });
  };
  const handleGroupAmount = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setGroup((pre) => {
      const amount = parseInt(e.target.value);
      if (amount) pre[index].amount = amount;
      else pre[index].amount = 0;
      return pre;
    });
  };
  const handleDeleteOnClick = (index: number) => {
    const newGroup = [...group];
    newGroup.splice(index, 1);
    setGroup(newGroup);
  };
  const handleSaveButtonOnClick = () => {
    console.log(group);
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
              ref={sportsTypeRef}
            >
              <option disabled value={-1}>
                Choose a organization
              </option>
              {organizations.map((org, index) => (
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
          />
        </div>

        <div className="flex flex-row gap-4 md:mt-8 mt-4 flex-wrap">
          <h2 className=" my-auto text-sm sm:text-lg ">Date:*</h2>
          <Datepicker
            value={value}
            onChange={handleValueChange}
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
            defaultValue={-1}
            ref={sportsTypeRef}
            disabled={false}
          >
            <option disabled value={-1}>
              Choose a sport
            </option>
            {sports_types.map((sport, index) => (
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
          <h2 className=" my-auto text-sm sm:text-lg">Fee:</h2>
          <input
            type="number"
            className="input input-bordered w-full input-sm max-w-sm input-primary"
            min="0"
            ref={feeRef}
          />
        </div>
      </div>
      <div className="flex gap-4 md:mt-8 mt-4 w-full">
        <div className="flex gap-4">
          <h2 className=" my-auto text-sm sm:text-lg">Group details</h2>
          <AiOutlinePlus
            className="w-6 h-6 bg-primary text-white rounded-full cursor-pointer"
            onClick={handleGroupAddOnClick}
          />
        </div>
      </div>
      <div className=" min-w-full">
        {group.length > 0 ? (
          group.map((item, index) => {
            return (
              <div className="flex gap-4" key={index}>
                <div className=" md:mt-8 mt-4">
                  {index === 0 && (
                    <h2 className=" my-auto text-sm sm:text-lg mb-2">Name:</h2>
                  )}
                  <input
                    type="text"
                    className="input input-bordered w-full input-sm max-w-sm input-primary"
                    defaultValue={item.name}
                    onChange={(e) => handleGroupName(e, index)}
                  />
                </div>
                <div className="md:mt-8 mt-4">
                  {index === 0 && (
                    <h2 className=" my-auto text-sm sm:text-lg mb-2">
                      Amount:
                    </h2>
                  )}
                  <input
                    type="number"
                    className="input input-bordered w-full input-sm max-w-[100px] input-primary"
                    ref={venueRef}
                    defaultValue={item.amount}
                    onChange={(e) => handleGroupAmount(e, index)}
                  />
                </div>
                <div className=" flex flex-col justify-end">
                  <AiOutlineClose
                    className="w-6 h-6 bg-primary text-white rounded-full cursor-pointer"
                    onClick={() => handleDeleteOnClick(index)}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <div className="mockup-code  bg-primary text-primary-content mt-4">
            <pre data-prefix=">">
              <code>Click the add icon to add your group :)</code>
            </pre>
            <pre data-prefix=">">
              <code>Waiting...</code>
            </pre>
          </div>
        )}
      </div>
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
