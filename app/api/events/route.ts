import { upsertEventBody } from "@/lib/api";
import prisma from "@/lib/client/prismaClient";

import type { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;


export async function POST(req: NextRequest) {
  const body: upsertEventBody = await req.json();
  try {
    // if has id then update organization, if not then create new one.
    let result;
    if (!body.id) {
      result = await prisma.social_event.create({
        data: {
          ownerId: body.ownerId!,
          organizationId: body.organizationId!,
          name: body.name!,
          address: body.address!,
          venue_name: body.venue_name,
          date: body.date!,
          booking_groups: body.booking_groups!,
          sports_typeId: body.sports_typeId!,
          fee: body.fee!,
          description: body.description
        }
      })
    } else {
      const id = body.id;
      delete body.id;
      result = await prisma.social_event.update({
        where: {
          id: id
        },
      data: body
    });
    }
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