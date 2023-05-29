/*
  Warnings:

  - Made the column `booking_groups` on table `social_event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "social_event" ALTER COLUMN "booking_groups" SET NOT NULL;
