import { createServerClient } from "@/lib/client/supabaseServer";
import { redirect } from "next/navigation";
import Login from "@/components/login/Login";
const Page = async () => {
  const supabase = createServerClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) redirect("/");
  console.log(process.env.RESET_PASSWORD_URL);
  return <Login redirectUrl={process.env.RESET_PASSWORD_URL} />;
};

export default Page;
