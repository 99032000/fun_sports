import { deleteEvent } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

function EventCardModal({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDeleteOnClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const result = await deleteEvent(id);
    if (result.success) {
      router.refresh();
    } else {
      toast.error("fail to delete event.");
    }
    const element = document.getElementById(`${id}+"event_card"`) as any;
    element.showModal();
    setLoading(false);
  };

  return (
    <>
      <dialog id={`${id}+"event_card"`} className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete ?
          </h3>
          <div className="modal-action">
            <div className="flex gap-4 mt-8">
              <button
                className={
                  "btn sm:btn-sm md:btn-md btn-primary w-28 text-white "
                }
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
        </form>
      </dialog>
    </>
  );
}

export default EventCardModal;
