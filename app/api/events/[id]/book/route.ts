import { bookingInfo, event_group } from "@/lib/api";
import prisma from "@/lib/client/prismaClient";
import { getSession } from "@/lib/client/supabaseServer";
import { apiAuthCheck } from "@/utility/authCheck";

import type { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;


export async function POST(req: NextRequest, {
  params,
}: {
  params: { id: string };
}) {
  try {
    const authCheckResult = await apiAuthCheck();
    if (!authCheckResult) throw new Error("authentication failed");
    const body: bookingInfo[] = await req.json();
    // if has id then update organization, if not then create new one. 
    const id = parseInt(params.id);
    const event = await prisma.social_event.findUnique({
      where: {
        id: id
      },
      select: {
        booking_groups: true
      }
    });
    if (!event?.booking_groups) throw new Error("book group not found");
    const groups = event.booking_groups as event_group[]
    body.forEach((item) => {
      const group = groups[item.id];
      if (item.bookAmount <= 0) throw new Error(`${group.name} booking can't less than 1`);
      if (group.amount < group.booking_amount + item.bookAmount)
        throw new Error(`${group.name} don't have enough space`);
      group.booking_amount += item.bookAmount;
    });
    const session = await getSession();
    const userId = session!.user.id;
    const saveEventGroups = await prisma.social_event.update({
      where: {
        id
      },
      data: {
        booking_groups: groups
      }
    });
    console.log(saveEventGroups);
    const createBooking = await prisma.social_booking.create({
      data: {
        social_eventsId: id,
        userId,
        booking_info: body
      }
    });
    console.log(createBooking);
    return new Response(JSON.stringify({
      success: true,
      data: createBooking,
      error: null
    }), { status: 200 });
  } catch (e: any) {
    console.error(e);
    return new Response(JSON.stringify({
      success: false,
      data: null,
      error: e.message,
    }), { status: 400 });
  }
}