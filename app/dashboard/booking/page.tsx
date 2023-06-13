import prisma from "@/lib/client/prismaClient";
import Profile from "@/components/dashboard/Profile";
import { getSession } from "@/lib/client/supabaseServer";
import { getSportsType } from "@/lib/serverSideApi";
import Booking from "@/modules/dashboard/Booking";
const Page = async () => {
  const session = await getSession();
  const userId = session?.user.id;
  const bookingInfo = await prisma.social_booking.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      updated_at: "desc",
    },
    include: {
      social_event: {
        select: {
          name: true,
        },
      },
    },
  });
  return <Booking bookingInfo={bookingInfo} />;
};

export default Page;
