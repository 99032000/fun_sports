import prisma from "@/lib/client/prismaClient";
import { getSession, createServerClient } from "@/lib/client/supabaseServer";

import type { NextRequest, NextResponse } from 'next/server';

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
    const result = await prisma.organization.delete({
      where: {
        id,
      },
    });
    const storageResult = await supabase.storage.from("public").remove([`${userId}/${id}/avatar`]);
    if (storageResult.error) {
      throw new Error(storageResult.error.message);
    }
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
