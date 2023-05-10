import prisma from "@/lib/client/prismaClient";

import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'

export const revalidate = 0


export async function GET(req: Request) {
  const supabase = createRouteHandlerSupabaseClient({
    headers,
    cookies,
  });

  const auth = await supabase.auth.getUser();
  const body = req.body;
  const posts = await prisma.social_event.findMany()
  return new Response(JSON.stringify(posts), { status: 200 })
}
