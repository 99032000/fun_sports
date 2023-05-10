-- CreateTable
CREATE TABLE "hobby" (
    "id" SERIAL NOT NULL,
    "sports_typeId" INTEGER NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "hobby_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hobby" ADD CONSTRAINT "hobby_sports_typeId_fkey" FOREIGN KEY ("sports_typeId") REFERENCES "sports_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hobby" ADD CONSTRAINT "hobby_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
