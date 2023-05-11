import prisma from "@/lib/client/prismaClient";

import type { NextRequest, NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers'

export const revalidate = 60 * 60 * 24 * 7;


export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const sports_types = await prisma.sports_type.findMany({ select: { id: true, name: true } });
    return new Response(
      JSON.stringify({
        success: true,
        data: sports_types,
        error: null,
      })
      , { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(JSON.stringify({
      success: true,
      data: null,
      error,
    })), { status: 400 });
  }

}
