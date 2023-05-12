import prisma from "@/lib/client/prismaClient";

import type { NextRequest, NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers'

export const revalidate = 0;
/**
 *  body structure is  {
 *   id: 1,
 *   userInfo: {}
 *   hobbies: [
 *   {          
 *   sports_typeId: 1,
 *   level: 1,
 *  }
 * ]
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
      console.error(e, "userinfo update error");
      return new Response(JSON.stringify({
        success: false,
        error: "something went wrong when updating user"
      }), { status: 400 });
    }
  }
  // if hobbies is not empty then update the hobbies
  if (hobbies && hobbies.length > 0) {
    const hobbies_data = hobbies.map((item) => ({
      "sports_typeId": item.sports_typeId,
      "level": item.level,
      "userId": userId
    }))
    try {
      // create the hobbies update or create the hobbies promise
      const upsertPromises = hobbies_data.map((item) => {
        return prisma.hobby.upsert({
          create: {
            sports_typeId: item.sports_typeId,
            level: item.level,
            userId: userId
          }
          , update: {
            level: item.level,
          },
          where: {
            sports_typeId_userId: {
              sports_typeId: item.sports_typeId,
              userId: userId
            }
          }
        });
      });
      // resolve the promise
      const response = await Promise.all(upsertPromises);
    } catch (e) {
      console.error(e, "hobbies update error");
      return new Response(JSON.stringify({
        success: false,
        error: "something went wrong when creating hobbies"
      }), { status: 400 });
    }
  };
  return new Response(JSON.stringify({
    success: true
  }), { status: 200 });
}

