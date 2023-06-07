/* eslint-disable @next/next/no-img-element */
"use client";

import { event_group, upsertEvent, upsertEventBody } from "@/lib/api";
import { hoursList, minsList } from "@/utility/Date";
import type { organization, social_event, sports_type } from "@prisma/client";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Datepicker from "react-tailwindcss-datepicker";
import EventGroupDetails from "./UpdateEventGroupDetails";

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
  const [group, setGroup] = useState<event_group[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLSelectElement>(null);
  const minRef = useRef<HTMLSelectElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const venueRef = useRef<HTMLInputElement>(null);
  const feeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const time = useMemo(() => new Date(event.date), [event.date]);
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const [images, setImages] = useState<any[]>([]);
  useEffect(() => {
    nameRef.current!.value = event.name;
    addressRef.current!.value = event.address;
    venueRef.current!.value = event.venue_name || "";
    feeRef.current!.value = event.fee!.toString();
    descriptionRef.current!.value = event.description || "";
    hourRef.current!.value = time.getHours().toString();
    minRef.current!.value = time.getMinutes().toString();
    setGroup(event.booking_groups! as event_group[]);
    setImages(event.images_url);
    setDate({
      startDate: time,
      endDate: time,
    });
  }, [event, time]);

  const handleDateChange = (newValue: any) => {
    setDate(newValue);
  };
  const handleDeleteImageOnClick = (imageName: any) => {
    setImages((pre) =>
      images.filter((image) => {
        if (imageName.name) {
          return image.name !== imageName.name;
        } else {
          return image !== imageName;
        }
      })
    );
  };
  const uploadImages = async (e: any) => {
    const files = e.target.files as any[];
    if (files.length > 0) {
      for (let image of files) {
        if (image.size > 6291456) {
          toast.error("upload image cannot be larger than 6MB");
          return;
        }
      }
      setImages((pre) => [...pre, ...files]);
    }
  };
  const handleUpadteButtonOnClick = async () => {
    const hours = parseInt(hourRef.current!.value);
    const mins = parseInt(minRef.current!.value);
    const address = addressRef.current!.value;
    const name = nameRef.current!.value;
    const fee = parseFloat(parseFloat(feeRef.current!.value).toFixed(2));
    // form validation
    if (name === "") {
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
    if (images.length > 3) {
      toast.error("images can not exceed than 3");
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
      if (item.amount < item.booking_amount) {
        toast.error("group amount can not less than booking_amount");
        return;
      }
    }
    // update event start
    setLoading(true);
    const timeStamp = new Date(
      `${date.startDate.toDateString()} ${hours}:${mins}`
    );
    const body: upsertEventBody = {
      id: event.id,
      name,
      address,
      venue_name:
        venueRef.current!.value === "" ? undefined : venueRef.current!.value,
      date: timeStamp,
      booking_groups: group,
      fee,
    };
    if (descriptionRef.current!.value.length > 0) {
      body.description = descriptionRef.current!.value;
    }
    // const result = await upsertEvent(body);
    // check if the image is existing
    const eventId = event.id;
    const oldImagesList = images.map((image) => {
      if (typeof image === "string") {
        return image.split("/").pop();
      }
    });

    const newImagesList = images.filter((image) => {
      return typeof image !== "string" ? true : false;
    });

    const preList = ["image0", "image1", "image2"];

    // find images should delete
    const deleteList = preList.filter((list) => {
      const result = oldImagesList.find((oldImage) => oldImage === list);
      return result ? false : true;
    });
    // add old images url to list
    let urlList: string[] = [];
    images.forEach((image) => {
      typeof image === "string" && urlList.push(image);
    });
    // remove old images url from bucket
    if (deleteList.length > 0) {
      // delete images from bucket
      const pathnames = deleteList.map((list) => `${eventId}/${list}`);
      await supabase.storage.from("events").remove(pathnames);
    }
    // upload new images to bucket
    const uploadPromises = newImagesList.map((image) => {
      const newPath = deleteList.pop();
      return supabase.storage
        .from("events")
        .upload(`${eventId}/${newPath}`, image);
    });
    const imagePaths = await Promise.all(uploadPromises);

    // get new images url from bucket
    imagePaths.forEach((path) => {
      if (!path.error) {
        const url = supabase.storage
          .from("events")
          .getPublicUrl(path.data.path);
        urlList.push(url.data.publicUrl);
      }
    });
    body.images_url = urlList;
    const updateResult = await upsertEvent(body);
    if (updateResult.success) {
      toast.success("update event successfully");
      router.replace("/dashboard/event");
    } else {
      toast.error("update event failed");
    }
    setLoading(false);
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
      <div className="flex flex-row gap-4 mt-8 flex-wrap">
        <div className="mockup-code  bg-primary text-primary-content w-full text-sm">
          <pre data-prefix=">">
            <code>Image can not exceed 6MB</code>
          </pre>
        </div>
        <h2 className=" my-auto text-sm sm:text-lg">Upload avatar:</h2>
        <input
          type="file"
          className="file-input file-input-bordered file-input-primary w-full max-w-xs file-input-sm md:file-input-md"
          onChange={uploadImages}
          accept="image/*"
          multiple
        />
      </div>
      {images.length > 0 && (
        <div className="flex gap-6 mt-8 flex-wrap">
          {images.map((image, index) => (
            <div className="indicator" key={image.name ?? image}>
              <span
                className="indicator-item badge badge-secondary cursor-pointer w-10 h-8"
                onClick={() => handleDeleteImageOnClick(image)}
              >
                X
              </span>

              <img
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
                alt="your image"
                className=" w-36 h-28 rounded-xl object-cover"
              />
            </div>
          ))}
        </div>
      )}
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
            <a>Update Event</a>
          </li>
        </ul>
      </div>
      <div className=" mt-4 w-full p-6 m-auto bg-white rounded-md shadow-md">
        <h1 className=" text-xl">Update Event</h1>
        {eventInfo()}

        <div className="flex sm:justify-end justify-start">
          <button
            className={
              "btn btn-primary mt-8 shadow" +
              (loading ? " disabled loading" : "")
            }
            onClick={handleUpadteButtonOnClick}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateEvent;
