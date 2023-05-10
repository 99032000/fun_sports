import prisma from "@/lib/client/prismaClient";

import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import type { NextRequest, NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers'

export const revalidate = 0;


export async function GET(req: NextRequest, res: NextResponse) {
  //get the params from the request
  const { searchParams } = new URL(req.url);
  const email = searchParams.getAll("email");
  // check if the email is valid in the params
  if (!email || email.length === 0)
    return new Response(JSON.stringify({
      success: false,
      data: null,
      error: "did not find email as query param"
    }), { status: 400 });
  // get the user from the database
  const user = await prisma.user.findUnique({ where: { email: email[0] } });
  // if the user is found
  if (!user) return new Response(JSON.stringify({
    success: true,
    data: null,
    error: "did not find user"
  }), { status: 200 });
  // return the user
  return new Response(JSON.stringify({
    success: true,
    data: {
      user: user
    },
    error: null
  }), { status: 200 })
}
