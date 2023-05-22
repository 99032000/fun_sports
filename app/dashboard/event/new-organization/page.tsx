import prisma from "@/lib/client/prismaClient";
import { getSession } from "@/lib/client/supabaseServer";
import NewOrganization from "@/components/dashboard/NewOrganization";
const Page = async () => {
  const session = await getSession();
  const userId = session!.user.id;
  const sports_types = await prisma.sports_type.findMany();
  return <NewOrganization userId={userId} sports_types={sports_types} />;
};

export default Page;
