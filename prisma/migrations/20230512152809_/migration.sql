/*
  Warnings:

  - A unique constraint covering the columns `[sports_typeId,userId]` on the table `hobby` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "hobby_sports_typeId_userId_key" ON "hobby"("sports_typeId", "userId");
