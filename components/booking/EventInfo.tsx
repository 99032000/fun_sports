import { toLocalTimeString } from "@/utility/Date";
import type { social_booking, social_event } from "@prisma/client";
import ImageModal from "../dashboard/modals/ImageModal";
import Image from "next/image";
import { bookingInfo } from "@/lib/api";
import SocialBookingsTable from "./SocialBookingsTable";
function EventInfo({
  event,
  socialBookings,
}: {
  event: social_event;
  socialBookings: (social_booking & {
    user: {
      name: string;
    };
  })[];
}) {
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
    <>
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
      <div className=" md:mt-4 mt-2">
        <SocialBookingsTable socialBookings={socialBookings} />
      </div>
    </>
  );
}

export default EventInfo;
