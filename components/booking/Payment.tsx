/* eslint-disable @next/next/no-img-element */
import {
  PeekFilteredSocialBooking,
  bookingInfo,
  socialBookUpdate,
} from "@/lib/api";
import { social_booking } from "@prisma/client";
import { useRouter, usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import ImageUpload from "./ImageUpload";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import SocialBookingTable from "../common/SocialBookingTable";

function Payment({ socialBooking }: { socialBooking: social_booking }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();
  const pathName = usePathname();
  const bookingInfo = socialBooking.booking_info as bookingInfo[];
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const totalPrice = useMemo(() => {
    let price = 0;
    bookingInfo.forEach((item) => {
      price += item.price * item.bookAmount;
    });
    return price;
  }, [bookingInfo]);

  const handlePayLaterOnClick = () => {
    if (loading) return;
    setLoading(true);
    router.back();
    setLoading(false);
  };

  const handlePayNowOnClick = async (e: any) => {
    e.preventDefault();
    if (loading) return;
    if (images.length > 3) {
      toast.error("images can not exceed than 3");
      return;
    }
    if (images.length < 1) {
      toast.error("Please upload receipt.");
      return;
    }
    setLoading(true);
    const uploadPromises = images.map((image, index) => {
      return supabase.storage
        .from("socialBooking")
        .upload(`${socialBooking.id}/image${index}`, image);
    });
    const imagePaths = await Promise.all(uploadPromises);
    let urlList: string[] = [];
    imagePaths.forEach((path) => {
      if (!path.error) {
        const url = supabase.storage
          .from("events")
          .getPublicUrl(path.data.path);
        urlList.push(url.data.publicUrl);
      }
    });

    const body: PeekFilteredSocialBooking = {
      is_Paid: true,
      paidAmount: totalPrice,
      id: socialBooking.id,
      payment_image_url: urlList,
    };
    const result = await socialBookUpdate(body);

    if (result.success) {
      toast.success("payment updated successfully!");
      if (pathName === "/dashboard/booking") {
        router.refresh();
        const element = document.getElementById(
          `paymentModal${socialBooking.id}`
        ) as any;
        element.close();
      } else router.back();
    } else {
      toast.error(result.error);
    }
    setLoading(false);
  };
  return (
    <div>
      <h1>Summary</h1>
      <SocialBookingTable bookingInfo={bookingInfo} totalPrice={totalPrice} />
      <h1>Payment</h1>

      <ImageUpload images={images} setImages={setImages} />
      <div className="flex gap-4 mt-8 justify-end">
        <button
          className="btn btn-primary text-white"
          onClick={handlePayNowOnClick}
        >
          {loading && <span className="loading loading-spinner"></span>}
          Pay now
        </button>
        <button
          className="btn btn-secondary text-white"
          onClick={handlePayLaterOnClick}
        >
          {loading && <span className="loading loading-spinner"></span>}
          Pay later
        </button>
      </div>
    </div>
  );
}

export default Payment;
