import prisma from "@/lib/client/prismaClient";
import { redirect } from "next/navigation";
import UpdateEvent from "@/components/dashboard/UpdateEvent";
const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const id = searchParams.id as string | undefined;
  if (!id) {
    redirect("/dashboard/event");
  }
  // const session = await getSession();
  // const userId = session!.user.id;
  const event = await prisma.social_event.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!event) {
    redirect("/dashboard/event");
  }
  return <UpdateEvent event={event} />;
};

export default Page;
