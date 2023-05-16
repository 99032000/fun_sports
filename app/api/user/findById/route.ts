import prisma from "@/lib/client/prismaClient";

import type { NextRequest, NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers'

export const revalidate = 60 * 60 * 2;


export async function GET(req: NextRequest, res: NextResponse) {
  //get the params from the request
  const { searchParams } = new URL(req.url);
  const id = searchParams.getAll("id");
  // check if the id is valid
  if (!id)
    return new Response(JSON.stringify({
      success: false,
      data: null,
      error: "did not find id as query param"
    }), { status: 400 });
  // get the user from the database
  const user = await prisma.user.findUnique({ where: { id: id[0] } });
  // if the user is found
  if (!user) return new Response(JSON.stringify({
    success: false,
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
