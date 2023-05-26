import prisma from "@/lib/client/prismaClient";
import { getSession } from "@/lib/client/supabaseServer";
import NewEvent from "@/components/dashboard/NewEvent";
import { getSportsType } from "@/lib/serverSideApi";
const Page = async () => {
  const session = await getSession();
  const userId = session!.user.id;
  const organizations_promise = prisma.organization.findMany({
    where: {
      userId: userId,
    },
  });
  const sports_types_promise = getSportsType();
  const [organizations, sports_types] = await Promise.all([
    organizations_promise,
    sports_types_promise,
  ]);
  return (
    <NewEvent
      userId={userId}
      organizations={organizations}
      sports_types={sports_types}
    />
  );
};

export default Page;
