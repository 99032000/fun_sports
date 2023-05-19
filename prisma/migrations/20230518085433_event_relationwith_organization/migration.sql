-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "social_event" ADD COLUMN     "organizationId" INTEGER;

-- AddForeignKey
ALTER TABLE "social_event" ADD CONSTRAINT "social_event_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
