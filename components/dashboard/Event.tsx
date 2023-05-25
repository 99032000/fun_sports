"use client";
import type { organization, social_event, sports_type } from "@prisma/client";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OrganizationCard from "./OrganizationCard";

type Props = {
  events: social_event[];
  organizations: organization[];
  sports_types: sports_type[];
};
const Event = ({ events, organizations, sports_types }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const organizationList = () =>
    organizations.map((organization) => {
      return (
        <OrganizationCard
          key={organization.id}
          organization={organization}
          sports_types={sports_types}
        />
      );
    });
  return (
    <div className="">
      <div className="text-sm md:text-lg breadcrumbs">
        <ul>
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <a>Event</a>
          </li>
        </ul>
      </div>
      <div className=" mt-4 w-full p-6 m-auto bg-white rounded-md shadow-md">
        <div>
          <div className="flex justify-between">
            <h1 className=" text-lg md:text-xl">Organizations</h1>
            <Link href="/dashboard/event/new-organization">
              <button className="btn btn-primary btn-sm md:btn-md">
                New Organization
              </button>
            </Link>
          </div>
          <div className=" mt-4 flex gap-4 flex-wrap">{organizationList()}</div>
        </div>
        <div className="divider"></div>
        <div className="flex justify-between">
          <h1 className=" text-lg md:text-xl">Event</h1>
          <Link href={"/dashboard/event/new-event"}>
            <button className="btn btn-primary btn-sm md:btn-md">
              New Event
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Event;
