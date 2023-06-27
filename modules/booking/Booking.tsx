"use client";
import type { social_booking, social_event } from "@prisma/client";
import EventInfo from "../../components/booking/EventInfo";
import BookingProcess from "../../components/booking/BookingProcess";
import { useTranslations } from "next-intl";

type props = {
  event: social_event;
  userId: string;
  socialBookings: (social_booking & {
    user: {
      name: string;
    };
  })[];
};

function Booking({ event, socialBookings }: props) {
  const t = useTranslations("home.book");
  return (
    <div className=" mt-4 w-full p-6 m-auto bg-white rounded-md shadow-md">
      <h1 className=" text-xl">{t("bookInfo")}</h1>
      <div className="flex flex-col md:flex-row">
        <div className=" flex-1">
          {<EventInfo event={event} socialBookings={socialBookings} />}
        </div>
        <div className="divider md:divider-horizontal"></div>
        <div className=" flex-1">{<BookingProcess event={event} />}</div>
      </div>
    </div>
  );
}

export default Booking;
