import SocialBookingsTable from "@/components/booking/SocialBookingsTable";
import type { social_booking } from "@prisma/client";

function EventCardViewBookModal({
  eventId,
  socialBookings,
}: {
  eventId: number;
  socialBookings: (social_booking & {
    user: {
      name: string;
    };
  })[];
}) {
  return (
    <dialog id={`${eventId}viewBook`} className="modal">
      <form method="dialog" className="modal-box">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <div className=" mt-4">
          <SocialBookingsTable socialBookings={socialBookings} />
        </div>
      </form>
    </dialog>
  );
}

export default EventCardViewBookModal;
