/*
  Warnings:

  - You are about to drop the column `social_eventsId` on the `social_booking` table. All the data in the column will be lost.
  - Added the required column `social_eventId` to the `social_booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "social_booking" DROP CONSTRAINT "social_booking_social_eventsId_fkey";

-- AlterTable
ALTER TABLE "social_booking" DROP COLUMN "social_eventsId",
ADD COLUMN     "social_eventId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "social_booking" ADD CONSTRAINT "social_booking_social_eventId_fkey" FOREIGN KEY ("social_eventId") REFERENCES "social_event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
