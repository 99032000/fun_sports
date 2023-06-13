import type { social_booking } from "@prisma/client";
import BookCard from "@/components/dashboard/BookCard";

type Props = {
  bookingInfo: (social_booking & {
    social_event: {
      name: string;
    };
  })[];
};
const Booking = ({ bookingInfo }: Props) => {
  return (
    <div className="">
      <div className="text-sm md:text-lg breadcrumbs">
        <ul>
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <a>Booking</a>
          </li>
        </ul>
      </div>
      <div className=" mt-4 w-full p-6 m-auto bg-white rounded-md shadow-md">
        <h1 className=" text-lg md:text-xl">Booking</h1>
        <div className="divider"></div>
        <div className="flex gap-4 flex-wrap">
          {bookingInfo.map((item) => {
            return <BookCard socialBooking={item} key={item.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Booking;
