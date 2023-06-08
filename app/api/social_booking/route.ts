import { PeekFilteredSocialBooking } from "@/lib/api";
import prisma from "@/lib/client/prismaClient";
import { apiAuthCheck } from "@/utility/authCheck";

import type { NextRequest } from 'next/server';

export const revalidate = 0;


export async function POST(req: NextRequest) {
  const body: PeekFilteredSocialBooking = await req.json();
  try {
    const authCheckResult = await apiAuthCheck();
    if (!authCheckResult) throw new Error("authentication failed");
    const result = await prisma.social_booking.update({
      where: {
        id: body.id,
      },
      data: body
    })

    return new Response(JSON.stringify({
      success: true,
      data: result,
      error: null,
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