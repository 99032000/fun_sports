import type { social_booking, social_event } from "@prisma/client";
import EventInfo from "../../components/booking/EventInfo";
import BookingProcess from "../../components/booking/BookingProcess";
type props = {
  event: social_event;
  userId: string;
  socialBookings: (social_booking & {
    user: {
      name: string;
    };
  })[];
};

function Booking({ event, userId, socialBookings }: props) {
  return (
    <div className=" mt-4 w-full p-6 m-auto bg-white rounded-md shadow-md">
      <h1 className=" text-xl">Booking</h1>
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
