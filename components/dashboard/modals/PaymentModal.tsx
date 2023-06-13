import Payment from "@/components/booking/Payment";
import { social_booking } from "@prisma/client";

function PaymentModal({ socialBooking }: { socialBooking: social_booking }) {
  return (
    <dialog id={`paymentModal${socialBooking.id}`} className="modal">
      <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <Payment socialBooking={socialBooking} />
      </form>
    </dialog>
  );
}

export default PaymentModal;
