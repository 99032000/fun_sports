/*
  Warnings:

  - Added the required column `booking_info` to the `social_booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "social_booking" ADD COLUMN     "booking_info" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "social_event" ALTER COLUMN "venue_name" DROP NOT NULL,
ALTER COLUMN "booking_groups" DROP NOT NULL;
