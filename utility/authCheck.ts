import { getSession } from "@/lib/client/supabaseServer";

export const apiAuthCheck = async (comparedUserId?: string) => {
  const session = await getSession();
  const userId = session?.user.id;
  if (!userId) return false;
  if (comparedUserId && comparedUserId !== userId) return false;
  return true;
}