import { upsertOrganizationBody } from "@/lib/api";
import prisma from "@/lib/client/prismaClient";

import type { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;


export async function POST(req: NextRequest) {
  const body: upsertOrganizationBody = await req.json();
  try {
    // if has id then update organization, if not then create new one.
    if (!body.id) {
      const result = await prisma.organization.create({
        data: {
          name: body.name!,
          phone: body.phone,
          description: body.description!,
          wechatId: body.wechatId!,
          userId: body.userId!,
          sports_typeId: body.sports_typeId!,
          avatar_url: body.avatar_url
        }
      })
      return new Response(JSON.stringify({
        success: true,
        data: result,
        error: null,
      }), { status: 200 });
    } else {
      const result = await prisma.organization.update({
        where: {
          id: body.id!
        },
        data: body
      });
      return new Response(JSON.stringify({
        success: true,
        data: result,
        error: null,
      }), { status: 200 });
    }
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({
      success: false,
      data: null,
      error,
    }), { status: 400 });
  }
}