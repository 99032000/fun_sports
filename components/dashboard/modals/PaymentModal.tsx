import Payment from "@/components/booking/Payment";
import { social_booking } from "@prisma/client";

function PaymentModal({ socialBooking }: { socialBooking: social_booking }) {
  return (
    <dialog id={`paymentModal${socialBooking.id}`} className="modal">
      <form method="dialog" className="modal-box">
        <button
          htmlFor={`paymentModal${socialBooking.id}`}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <Payment socialBooking={socialBooking} />
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
        </div>
      </form>
    </dialog>
  );
}

export default PaymentModal;
