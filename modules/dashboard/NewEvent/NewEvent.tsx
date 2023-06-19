/* eslint-disable @next/next/no-img-element */
"use client";

import { upsertEvent, upsertEventBody, event_group } from "@/lib/api";
import { hoursList, minsList } from "@/utility/Date";
import type { organization, sports_type } from "@prisma/client";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import EventGroupDetails from "../../../components/dashboard/EventGroupDetails";
import BreadCrumb from "@/components/common/BreadCrumb";
import { ControlledTextInput } from "@/components/common/input/TextInput";
import { useForm } from "react-hook-form";
import { ControlledSelectInput } from "@/components/common/input/SelectInput";
import { ControlledNumberInput } from "@/components/common/input/NumberInput";
import { ControlledDateInput } from "@/components/common/input/DateInput";
import { addDays } from "date-fns";
import { ControlledTextareaInput } from "@/components/common/input/TextareaInput";
import { ControlledFileInput } from "@/components/common/input/FileInput";
import { resolver } from "./NewEventForm.schema";
import { useNewEventForm } from "./useNewEventForm.hook";

type props = {
  userId: string;
  organizations: organization[];
  sports_types: sports_type[];
};

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
  const [images, setImages] = useState<any[]>([]);
  const nameRef = useRef<HTMLInputElement>(null);
  const orgRef = useRef<HTMLSelectElement>(null);
  const hourRef = useRef<HTMLSelectElement>(null);
  const minRef = useRef<HTMLSelectElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const venueRef = useRef<HTMLInputElement>(null);
  const feeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const handleDateChange = (newValue: any) => {
    setDate(newValue);
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

  const handleDeleteImageOnClick = (imageName: string) => {
    setImages((pre) => images.filter((image) => image.name !== imageName));
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
    const fee = parseFloat(parseFloat(feeRef.current!.value).toFixed(2));
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
    }
    // create event start
    setLoading(true);
    const timeStamp = new Date(`${date.startDate} ${hours}:${mins}`);
    const body: upsertEventBody = {
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
    if (descriptionRef.current!.value.length > 0) {
      body.description = descriptionRef.current!.value;
    }
    const result = await upsertEvent(body);
    if (result.success) {
      setLoading(false);
      toast.success("event created successfully");
      // upload images----------------------------------------------------------------
      // if no image then redirect now
      if (images.length === 0) {
        router.replace("/dashboard/event");
        setLoading(false);
        return;
      }
      // upload images to bucket
      const uploadPromises = images.map((image, index) => {
        return supabase.storage
          .from("events")
          .upload(`${result.data.id}/image${index}`, image);
      });
      //! may need to handle error
      const imagePaths = await Promise.all(uploadPromises);
      // get public url from bucket
      let urlList: string[] = [];
      imagePaths.forEach((path) => {
        if (!path.error) {
          const url = supabase.storage
            .from("events")
            .getPublicUrl(path.data.path);
          urlList.push(url.data.publicUrl);
        }
      });
      // upload event images_url
      await upsertEvent({
        id: result.data.id as number,
        images_url: urlList,
      });
      //End upload----------------------------------------------------------------

      router.replace("/dashboard/event");
      setLoading(false);
      return;
    }
    if (result.error) toast.error("failed to create event");
    setLoading(false);
  };

  const today = new Date();

  const eventDateRange = addDays(today, 28);

  const { control, onSubmit } = useNewEventForm();
  const path = usePathname();

  return (
    <div className="">
      <BreadCrumb url={path} />

      <form
        onSubmit={onSubmit}
        className=" mt-4 w-full p-6 m-auto bg-white rounded-md shadow-md"
      >
        <h1 className=" text-xl">New Event</h1>

        <div className="grid grid-cols-1 grid-flow-row-dense auto-cols-max gap-4 lg:grid-cols-2">
          {organizations.length > 0 && (
            <ControlledSelectInput
              name="organisation"
              control={control}
              label="Organisation"
              placeholder="Choose an organisation"
              options={organizations}
            />
          )}

          <ControlledTextInput
            name="name"
            control={control}
            label="Name"
            required
          />

          <ControlledDateInput
            name="date"
            control={control}
            label="Date"
            min={today}
            max={eventDateRange}
            required
          />

          <ControlledSelectInput
            name="sport_type"
            control={control}
            label="Sport Type"
            options={sports_types}
            required
            disabled
          />

          <ControlledTextInput
            name="address"
            control={control}
            label="Address"
            required
          />
          <ControlledTextInput
            name="venue"
            control={control}
            label="Venue name"
          />

          <ControlledNumberInput
            name="fee"
            control={control}
            label="Fee"
            required
          />

          <ControlledTextareaInput
            name="description"
            control={control}
            label="Description"
            placeholder="Describe your organization"
            required
          />
        </div>

        {/* Validation does not happen onChange rn, simply because I'm too lazy to set up error handling with toast. */}
        <ControlledFileInput
          name="images"
          control={control}
          label="Upload Event Image"
          accept="image/*"
          multiple
        />

        {images.length > 0 && (
          <div className="flex gap-6 mt-8 flex-wrap">
            {images.map((image) => (
              <div className="indicator" key={image.name}>
                <span
                  className="indicator-item badge badge-secondary cursor-pointer w-10 h-8"
                  onClick={() => handleDeleteImageOnClick(image.name)}
                >
                  X
                </span>

                <img
                  src={URL.createObjectURL(image)}
                  alt="your image"
                  className=" w-36 h-28 rounded-xl object-cover"
                />
              </div>
            ))}
          </div>
        )}
        <EventGroupDetails group={group} setGroup={setGroup} />

        <div className="flex sm:justify-end justify-start">
          <button
            type="submit"
            className={
              "btn btn-primary mt-8 shadow" +
              (loading ? " btn-disabled loading" : "")
            }
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewEvent;