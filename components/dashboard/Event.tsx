"use client";
import type { organization, social_event, sports_type } from "@prisma/client";
import Link from "next/link";
import OrganizationCard from "./OrganizationCard";
import EventCard from "./EventCard";

type Props = {
  events: social_event[];
  organizations: organization[];
  sports_types: sports_type[];
};
const Event = ({ events, organizations, sports_types }: Props) => {
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
  const eventList = () =>
    events.map((event) => {
      return (
        <EventCard key={event.id} event={event} sports_types={sports_types} />
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
              <button className="btn btn-primary btn-sm md:btn-md text-xs sm:text-sm">
                New Organization
              </button>
            </Link>
          </div>
          {organizations.length > 0 ? (
            <div className=" mt-4 flex gap-8 flex-wrap">
              {organizationList()}
            </div>
          ) : (
            <div className="mockup-code  bg-primary text-primary-content mt-4">
              <pre data-prefix=">">
                <code>Add your first organization :)</code>
              </pre>
              <pre data-prefix=">">
                <code>Waiting...</code>
              </pre>
            </div>
          )}
        </div>
        <div className="divider"></div>
        <div className="flex justify-between">
          <h1 className=" text-lg md:text-xl">Event</h1>
          <Link href={"/dashboard/event/new-event"}>
            <button className="btn btn-primary btn-sm md:btn-md text-xs sm:text-sm">
              New Event
            </button>
          </Link>
        </div>
        {events.length > 0 ? (
          <div className=" mt-4 flex gap-8 flex-wrap">{eventList()}</div>
        ) : (
          <div className="mockup-code  bg-primary text-primary-content mt-4">
            <pre data-prefix=">">
              <code>Add your first organization :)</code>
            </pre>
            <pre data-prefix=">">
              <code>Waiting...</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Event;
