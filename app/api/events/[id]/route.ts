import prisma from "@/lib/client/prismaClient";
import { getSession, createServerClient } from "@/lib/client/supabaseServer";
import type { NextRequest } from 'next/server';

export const revalidate = 0;


export async function DELETE(req: NextRequest, {
  params,
}: {
  params: { id: string };
}) {
  //get the params from the request
  const supabase = createServerClient();
  const session = await getSession();
  const userId = session?.user.id;
  const id = parseInt(params.id);
  try {
    if (!userId) {
      throw new Error("no authenticated user");
    }
    const socialBookingsCount = await prisma.social_booking.count({
      where: {
        social_eventId: id
      }
    });
    const { date } = await prisma.social_event.findUniqueOrThrow({
      where: {
        id
      },
      select: {
        date: true
      }
    });
    if (socialBookingsCount > 0 && date >= new Date(Date.now())) throw new Error("Can not delete event!");
    if (socialBookingsCount > 0) {
      const socialBookings = await prisma.social_booking.findMany({
        where: {
          social_eventId: id
        },
        select: {
          id: true,
          payment_image_url: true
        }
      });
      socialBookings.forEach(async socialBooking => {
        const countUrls = socialBooking.payment_image_url.length;
        const socialBookingId = socialBooking.id;
        if (countUrls > 0) {
          await supabase.storage.from("socialBooking")
            .remove([`${socialBookingId}/image0`,
            `${socialBookingId}/image1`,
            `${socialBookingId}/image2`]);
        }
        await prisma.social_booking.delete({
          where: {
            id: socialBooking.id
          }
        })
      })
    }
    const result = await prisma.social_event.delete({
      where: {
        id,
      },
    });
    if (result.images_url.length > 0) {
      const storageResult = await supabase.storage.from("events")
        .remove([`${params.id}/image0`,
        `${params.id}/image1`,
        `${params.id}/image2`]);
      if (storageResult.error) {
        throw new Error(storageResult.error.message);
      }
    }
    return new Response(JSON.stringify({
      success: true,
      data: result,
      error: null,
    }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify(JSON.stringify({
      success: false,
      data: null,
      error,
    })), { status: 400 });
  }
}
