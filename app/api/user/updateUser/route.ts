import prisma from "@/lib/client/prismaClient";

import type { NextRequest, NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers'

export const revalidate = 0;
/**
 *  body structure is  {
 *   id: 1,
 *   userInfo: {}
 *   hobbies: []
 * }
 * 
 */
type Body = {
  userId: string,
  userInfo: {},
  hobbies: { sports_typeId: number, level: number }[]
}

export async function POST(req: NextRequest, res: NextResponse) {
  //get the params from the request
  const body: Body = await req.json();
  console.log(body);
  const { userId, userInfo, hobbies } = body;
  // check if the id is valid
  if (!userId) {
    return new Response(JSON.stringify({
      success: false,
      error: 'id is required'
    }), { status: 400 });
  }
  // check if the userInfo is not empty or hobbies is not empty
  if (Object.keys(userInfo).length === 0 && hobbies.length === 0) {
    return new Response(JSON.stringify({
      success: false,
      error: 'userInfo or hobbies is required'
    }), { status: 400 });
  }
  // if userinfo is not empty then update the userInfo
  if (userInfo && Object.keys(userInfo).length > 0) {
    try {
      const response = await prisma.user.update({
        where: {
          id: userId
        },
        data: userInfo
      });
    } catch (e) {
      return new Response(JSON.stringify({
        success: false,
        error: "something went wrong when updating user"
      }), { status: 400 });
    }
  }
  // if hobbies is not empty then update the hobbies
  if (hobbies && hobbies.length > 0) {
    try {
      const response = await prisma.hobby.createMany({
        data: hobbies.map((item) => ({
          "sports_typeId": item.sports_typeId,
          "level": item.level,
          "userId": userId
        }))
      });
    } catch (e) {
      return new Response(JSON.stringify({
        success: false,
        error: "something went wrong when creating hobbies"
      }), { status: 400 });
    }
  };
}

