import prisma from "@/lib/client/prismaClient";
import Profile from "@/components/dashboard/Profile";
import { getSession } from "@/lib/client/supabaseServer";
const Page = async () => {
  const session = await getSession();
  const userId = session?.user.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return <Profile user={user} />;
};

export default Page;
