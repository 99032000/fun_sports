import prisma from "@/lib/client/prismaClient";
import Profile from "@/components/dashboard/Profile";
import { getSession } from "@/lib/client/supabaseServer";
import { getSportsType } from "@/lib/serverSideApi";
import Booking from "@/components/dashboard/Booking";
const Page = async () => {
  const session = await getSession();
  const userId = session?.user.id;

  return <Booking />;
};

export default Page;
