import { Dispatch, SetStateAction, useState } from "react";
import { event_group, bookingInfo, bookEvent } from "@/lib/api";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { social_booking } from "@prisma/client";
function ChooseGroup({
  groups,
  eventId,
  setStep,
  setSocialBook,
}: {
  groups: event_group[];
  eventId: number;
  setStep: Dispatch<SetStateAction<number>>;
  setSocialBook: Dispatch<SetStateAction<social_booking | undefined>>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [bookingInfo, setBookingInfo] = useState<bookingInfo[]>([]);
  const bookInputOnchange = (id: number, e: any) => {
    const bookAmount = parseInt(e.target.value);
    if (Number.isNaN(bookAmount) || bookAmount <= 0) {
      setBookingInfo((pre) => {
        const copyPre = [...pre];
        const index = copyPre.findIndex((item) => item.id === id);
        if (index >= 0) {
          copyPre.splice(index, 1);
        }
        return copyPre;
      });
      return;
    }
    setBookingInfo((pre) => {
      const copyPre = [...pre];
      const index = copyPre.findIndex((item) => item.id === id);
      if (index < 0 && bookAmount > 0)
        copyPre.push({
          id: id,
          bookAmount,
          price: groups[id].price,
          name: groups[id].name,
        });
      else copyPre[index].bookAmount = bookAmount;
      return copyPre;
    });
  };

  const bookOnClick = async () => {
    if (bookingInfo.length === 0) return;
    setLoading(true);
    const result = await bookEvent(bookingInfo, eventId);
    console.log(result);
    if (result.success) {
      setLoading(false);
      toast.success("Book was successfully 🥹");
      setStep((pre) => pre + 1);
      setSocialBook(result.data as social_booking);
    } else {
      toast.error(result.message);
      setBookingInfo([]);
      router.refresh();
    }
    setLoading(false);
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-xs sm:table-md">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Available</th>
            <th>Price</th>
            <th>Book</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.amount - item.booking_amount}</td>
                <td>{item.price}</td>
                <td>
                  {
                    <input
                      type="number"
                      className="input input-bordered input-xs sm:input-sm  w-16 sm:max-w-xs input-primary"
                      min="0"
                      defaultValue={0}
                      onChange={(e) => bookInputOnchange(index, e)}
                    />
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex sm:justify-end justify-start">
        <button
          className={
            "btn btn-primary my-8 shadow " + (loading ? " btn-disabled" : "")
          }
          onClick={bookOnClick}
        >
          {loading && <span className="loading loading-spinner"></span>}
          Book
        </button>
      </div>
    </div>
  );
}

export default ChooseGroup;
