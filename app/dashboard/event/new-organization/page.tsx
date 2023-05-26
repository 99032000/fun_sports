import { getSession } from "@/lib/client/supabaseServer";
import NewOrganization from "@/components/dashboard/NewOrganization";
import { getSportsType } from "@/lib/serverSideApi";
const Page = async () => {
  const session = await getSession();
  const userId = session!.user.id;
  const sports_types = await getSportsType();
  return <NewOrganization userId={userId} sports_types={sports_types} />;
};

export default Page;
