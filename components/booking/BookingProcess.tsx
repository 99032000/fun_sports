"use client";

import { event_group } from "@/lib/api";
import { social_booking, social_event } from "@prisma/client";
import { useState } from "react";
import ChooseGroup from "./ChooseGroup";
import Payment from "./Payment";

function BookingProcess({ event }: { event: social_event }) {
  const [step, setStep] = useState(0);
  const [socialBook, setSocialBook] = useState<social_booking>();
  return (
    <>
      <h1 className=" text-xl">Booking detail</h1>
      <ul className="steps mt-4">
        <li className={`step ${step === 0 && "step-primary"}`}>Choose</li>
        <li className={`step ${step > 0 && "step-primary"}`}>Payment</li>
      </ul>
      <div className="mt-4">
        {step === 0 && (
          <ChooseGroup
            eventId={event.id}
            groups={event.booking_groups as event_group[]}
            setStep={setStep}
            setSocialBook={setSocialBook}
          />
        )}
        {step === 1 && <Payment socialBooking={socialBook!} />}
      </div>
    </>
  );
}

export default BookingProcess;
