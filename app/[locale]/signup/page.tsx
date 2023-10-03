import SignUp from "@/components/signUp/SignUp";
import prisma from "@/lib/client/prismaClient";
import { createServerClient } from "@/lib/client/supabaseServer";
import {redirect} from 'next-intl/server';
const Page = async () => {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) redirect("/");
  const response = await prisma.sports_type.findMany();
  return <SignUp sports_types={response} />;
};

export default Page;
