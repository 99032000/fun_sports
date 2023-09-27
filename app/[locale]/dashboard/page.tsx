import prisma from "@/lib/client/prismaClient";
import Profile from "@/components/dashboard/Profile";
import { getSession } from "@/lib/client/supabaseServer";
import { getSportsType } from "@/lib/serverSideApi";
const Page = async () => {
  const session = await getSession();
  const userId = session?.user.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      hobby: {
        include: {
          sports_type: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  const sports_types = await getSportsType();
  return <Profile user={user} sports_types={sports_types} />;
};

export default Page;
