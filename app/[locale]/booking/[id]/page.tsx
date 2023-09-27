import NotFound from "@/components/booking/NotFound";
import Booking from "@/modules/booking/Booking";
import prisma from "@/lib/client/prismaClient";
import { getSession } from "@/lib/client/supabaseServer";
export default async function Page({ params }: { params: { id: string } }) {
  const session = await getSession();
  const userId = session!.user.id;
  const event = await prisma.social_event.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!event) return <NotFound />;
  const socialBookings = await prisma.social_booking.findMany({
    where: {
      social_eventId: parseInt(params.id),
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <Booking userId={userId} event={event} socialBookings={socialBookings} />
  );
}
