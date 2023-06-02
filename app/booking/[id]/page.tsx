import NotFound from "@/components/booking/NotFound";
import Booking from "@/components/booking/Booking";
import prisma from "@/lib/client/prismaClient";
import { getSession } from "@/lib/client/supabaseServer";
export default async function Page({ params }: { params: { id: string } }) {
  const session = await getSession();
  const userId = session!.user.id;
  const event = await prisma.social_event.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!event) return <NotFound />;
  return <Booking userId={userId} event={event} />;
}
