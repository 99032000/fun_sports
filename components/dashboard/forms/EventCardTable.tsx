import { event_group } from "@/lib/api";

function EventCardTable({ list }: { list: event_group[] }) {
  return (
    <table className="table w-full table-compact">
      {/* head */}
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Booked Amount</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.amount}</td>
              <td>{item.booking_amount}</td>
              <td>{item.price}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default EventCardTable;
