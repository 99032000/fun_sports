import { social_event, sports_type } from "@prisma/client";
import Image from "next/image";
type props = {
  events: {
    organization: {
      avatar_url: string | null;
    } | null;
    sports_type: sports_type;
    id: number;
    name: string;
    address: string;
    date: Date;
    fee: number | null;
  }[];
};

const Home = ({ events }: props) => {
  return <div className="h-full">home</div>;
};

export default Home;
