/* eslint-disable @next/next/no-img-element */
"use client";

import type { social_booking } from "@prisma/client";
import { useMemo } from "react";
import { AiFillDelete } from "react-icons/ai";
import { bookingInfo } from "@/lib/api";
import SocialBookingTable from "../common/SocialBookingTable";
import BookingCardModal from "./modals/BookingCardModal";
const BookCard = ({
  socialBooking,
}: {
  socialBooking: social_booking & {
    social_event: {
      name: string;
    };
  };
}) => {
  const bookingInfo = socialBooking.booking_info as bookingInfo[];

  const totalPrice = useMemo(() => {
    let price = 0;
    bookingInfo.forEach((item) => {
      price += item.price * item.bookAmount;
    });
    return price;
  }, [bookingInfo]);
  return (
    <div className="card bg-base-100 max-w-md shadow-xl p-4 flex flex-col gap-4 w-full sm:min-w-[350px]">
      <BookingCardModal id={socialBooking.id} />
      <div className="flex justify-between">
        <div className="flex gap-1 items-center">
          <h1>{socialBooking.social_event.name}</h1>
          {socialBooking.is_Paid ? (
            <div className="badge badge-primary">Paid</div>
          ) : (
            <div className="badge badge-secondary">Not paid</div>
          )}
        </div>
        {!socialBooking.is_Paid && (
          <div className="flex gap-8 justify-end">
            <div className="tooltip tooltip-secondary" data-tip="Delete">
              <label htmlFor={`bookingCard${socialBooking.id}`}>
                <AiFillDelete className=" text-secondary text-2xl cursor-pointer" />
              </label>
            </div>
          </div>
        )}
      </div>
      <SocialBookingTable bookingInfo={bookingInfo} totalPrice={totalPrice} />
      <button className={"btn btn-primary text-white "}>Pay</button>
    </div>
  );
};

export default BookCard;
