import { bookingInfo, event_group } from "@/lib/api";
import prisma from "@/lib/client/prismaClient";
import { getSession } from "@/lib/client/supabaseServer";

import type { NextRequest } from 'next/server';

export const revalidate = 0;


export async function DELETE(req: NextRequest, {
  params,
}: {
  params: { id: string };
}) {
  const session = await getSession();
  const userId = session?.user.id;
  const id = parseInt(params.id);
  try {
    if (!userId) {
      throw new Error("no authenticated user");
    }
    const booking = await prisma.social_booking.findFirstOrThrow({
      where: {
        id,
        userId,
      },
      include: {
        social_event: true
      }
    });
    const bookingInfo = booking.booking_info as bookingInfo[];
    const socialEvent = booking.social_event;
    const bookingGroup = socialEvent.booking_groups as event_group[];
    if (booking.is_Paid) throw new Error("Booking is paid");
    bookingInfo.forEach(item => {
      bookingGroup[item.id].booking_amount -= item.bookAmount;
    });
    await prisma.social_event.update({
      where: {
        id: socialEvent.id
      },
      data: {
        booking_groups: bookingGroup
      }
    });
    const result = await prisma.social_booking.delete({
      where: {
        id,
      },
    });
    return new Response(JSON.stringify({
      success: true,
      data: result,
      error: null,
    }), { status: 200 });
  } catch (e) {
    let error = { message: "unknown error" };
    if (e instanceof Error) {
      error.message = e.message;
    }
    return new Response(JSON.stringify({
      success: false,
      data: null,
      error: error.message
    }), { status: 400 });
  }
}
