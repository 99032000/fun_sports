"use client";

import { event_group } from "@/lib/api";
import type { social_booking, social_event } from "@prisma/client";
import { useState } from "react";
import ChooseGroup from "./ChooseGroup";
import Payment from "./Payment";
import { useTranslations } from "next-intl";

function BookingProcess({ event }: { event: social_event }) {
  const [step, setStep] = useState(0);
  const [socialBook, setSocialBook] = useState<social_booking>();
  const t = useTranslations("home.book");
  return (
    <>
      <h1 className=" text-xl">{t("bookInfo")}</h1>
      <ul className="steps mt-4">
        <li className={`step ${step === 0 && "step-primary"}`}>
          {t("choose")}
        </li>
        <li className={`step ${step > 0 && "step-primary"}`}>{t("payment")}</li>
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
