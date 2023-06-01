import Home from "@/components/home/Home";
import prisma from "@/lib/client/prismaClient";
export default async function Page() {
  const events = await prisma.social_event.findMany({
    select: {
      id: true,
      name: true,
      address: true,
      date: true,
      sports_type: true,
      fee: true,
      venue_name: true,
      organization: {
        select: {
          avatar_url: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
  return <Home events={events} />;
}
