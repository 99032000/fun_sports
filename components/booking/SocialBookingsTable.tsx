import { bookingInfo } from "@/lib/api";
import type { social_booking } from "@prisma/client";

function SocialBookingsTable({
  socialBookings,
}: {
  socialBookings: (social_booking & {
    user: {
      name: string;
    };
  })[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs md:table-md table-pin-rows">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Booked</th>
            <th>Is Paid</th>
          </tr>
        </thead>
        <tbody>
          {socialBookings.map((item, index) => {
            const bookInfo = item.booking_info as bookingInfo[];
            const totalBookedAmount = bookInfo.reduce(
              (sum, bookInfo) => sum + bookInfo.bookAmount,
              0
            );
            return (
              <tr key={item.id}>
                <th>{index + 1}</th>
                <td>{item.user.name}</td>
                <td>{totalBookedAmount}</td>
                <td>{item.is_Paid ? "💰" : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default SocialBookingsTable;
