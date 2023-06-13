import { deleteBooking } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function BookingCardModal({ id }: { id: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleDeleteOnClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const result = await deleteBooking(id);
    if (result.success) {
      router.refresh();
    } else {
      toast.error("fail to delete organization.");
    }
    document.getElementById(`bookingCard${id}`)?.click();
    setLoading(false);
  };
  const handleCloseOnClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    document.getElementById(`bookingCard${id}`)?.click();
  };
  return (
    <>
      <input type="checkbox" id={`bookingCard${id}`} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete ?
          </h3>
          <div className="modal-action">
            <div className="flex gap-4 mt-8">
              <button
                className={
                  "btn sm:btn-sm md:btn-md btn-primary w-28 text-white "
                }
                onClick={handleCloseOnClick}
              >
                No
              </button>
              <button
                className={
                  "btn sm:btn-sm md:btn-md btn-secondary w-28 text-white "
                }
                onClick={handleDeleteOnClick}
              >
                {loading && <span className="loading loading-spinner"></span>}
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingCardModal;
