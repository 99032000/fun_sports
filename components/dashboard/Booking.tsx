"use client";
import type { organization, social_event, sports_type } from "@prisma/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OrganizationCard from "./OrganizationCard";
import EventCard from "./EventCard";

type Props = {
  events: social_event[];
  organizations: organization[];
  sports_types: sports_type[];
};
const Booking = () => {
  return (
    <div className="">
      <div className="text-sm md:text-lg breadcrumbs">
        <ul>
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <a>Booking</a>
          </li>
        </ul>
      </div>
      <div className=" mt-4 w-full p-6 m-auto bg-white rounded-md shadow-md">
        <div>
          <h1 className=" text-lg md:text-xl">Booking</h1>
          <div className="divider"></div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
