import { getSession } from "@/lib/client/supabaseServer";
import { redirect } from "next/navigation";
export default async function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/");
  return (
    <section className=" max-w-7xl mx-auto bg-base-100 mt-4 px-4">
      {children}
    </section>
  );
}
