import { createEventBody } from "@/lib/api";
import prisma from "@/lib/client/prismaClient";

import type { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;


export async function POST(req: NextRequest) {
  const body: createEventBody = await req.json();
  try {
    // if has id then update organization, if not then create new one.
    const result = await prisma.social_event.create({
      data: body
    })
    return new Response(JSON.stringify({
      success: true,
      data: result,
      error: null
    }), { status: 200 });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({
      success: false,
      data: null,
      error,
    }), { status: 400 });
  }
}