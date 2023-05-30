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
    const result = await prisma.social_event.delete({
      where: {
        id,
      },
    });
    console.log(result.images_url);
    if (result.images_url.length > 0) {
      console.log("here", id);
      const storageResult = await supabase.storage.from("events").remove([`${params.id}/image0`, `${params.id}/image1`, `${params.id}/image2`]);
      console.log(storageResult);
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
