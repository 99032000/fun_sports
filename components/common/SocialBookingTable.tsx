import { bookingInfo } from "@/lib/api";

function SocialBookingTable({
  bookingInfo,
  totalPrice,
}: {
  bookingInfo: bookingInfo[];
  totalPrice: number;
}) {
  return (
    <>
      <table className="table table-xs sm:table-md">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bookingInfo.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.bookAmount}</td>
                <td>{item.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="divider"></div>
      <div className=" float-right">
        <h2>Total :${totalPrice}</h2>
      </div>
    </>
  );
}

export default SocialBookingTable;
