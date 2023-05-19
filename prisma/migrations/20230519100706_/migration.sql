-- DropIndex
DROP INDEX "organization_phone_key";

-- AlterTable
ALTER TABLE "organization" ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';
