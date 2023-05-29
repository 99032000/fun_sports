import prisma from "@/lib/client/prismaClient";

import type { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;


export async function DELETE(req: NextRequest, {
  params,
}: {
  params: { id: string };
}) {
  //get the params from the request
  const id = parseInt(params.id);
  try {
    const result = await prisma.social_event.delete({
      where: {
        id,
      },
    });
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
