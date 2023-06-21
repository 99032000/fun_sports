import prisma from "@/lib/client/prismaClient";
import { getSession } from "@/lib/client/supabaseServer";
import Event from "@/components/dashboard/Event";
import { getSportsType } from "@/lib/serverSideApi";
const Page = async () => {
  const session = await getSession();
  const userId = session?.user.id;
  const organizations_promise = prisma.organization.findMany({
    where: {
      userId: userId,
    },
  });
  const events_promise = prisma.social_event.findMany({
    where: {
      ownerId: userId,
    },
    orderBy: {
      date: "desc",
    },
    include: {
      Social_booking: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  const sports_types_promise = getSportsType();
  const [events, organizations, sports_types] = await Promise.all([
    events_promise,
    organizations_promise,
    sports_types_promise,
  ]);
  return (
    <Event
      events={events}
      organizations={organizations}
      sports_types={sports_types}
    />
  );
};

export default Page;
