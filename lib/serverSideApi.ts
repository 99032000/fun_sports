import { cache } from 'react';
import prisma from './client/prismaClient';
export const getSportsType = cache(async () => {
  const sportsType = await prisma.sports_type.findMany();
  return sportsType;
});