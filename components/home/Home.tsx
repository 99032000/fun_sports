import { sports_type } from "@prisma/client";
import EventCard from "./EventCard";

export type eventHome = {
  organization: {
    avatar_url: string | null;
    is_verified: boolean;
  } | null;
  sports_type: sports_type;
  id: number;
  name: string;
  address: string;
  date: Date;
  fee: number | null;
  venue_name: string | null;
};

type props = {
  events: eventHome[];
};

const Home = ({ events }: props) => {
  return (
    <div className="flex flex-col items-center gap-y-4 h-[100vh] overflow-y-scroll">
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </div>
  );
};

export default Home;
