/*
  Warnings:

  - Added the required column `sports_typeId` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sports_typeId` to the `social_event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "sports_typeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "social_event" ADD COLUMN     "sports_level" TEXT,
ADD COLUMN     "sports_typeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "sports_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sports_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sports_type_name_key" ON "sports_type"("name");

-- AddForeignKey
ALTER TABLE "organization" ADD CONSTRAINT "organization_sports_typeId_fkey" FOREIGN KEY ("sports_typeId") REFERENCES "sports_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "social_event" ADD CONSTRAINT "social_event_sports_typeId_fkey" FOREIGN KEY ("sports_typeId") REFERENCES "sports_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
