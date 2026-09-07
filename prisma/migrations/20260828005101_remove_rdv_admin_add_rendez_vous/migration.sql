/*
  Warnings:

  - You are about to drop the `rendez_vous_administratifs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "rendez_vous_administratifs" DROP CONSTRAINT "rendez_vous_administratifs_gereParId_fkey";

-- DropForeignKey
ALTER TABLE "rendez_vous_administratifs" DROP CONSTRAINT "rendez_vous_administratifs_residentId_fkey";

-- DropTable
DROP TABLE "rendez_vous_administratifs";

-- DropEnum
DROP TYPE "CategorieRdvAdmin";

-- CreateTable
CREATE TABLE "rendez_vous" (
    "id" TEXT NOT NULL,
    "motif" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "heure" TEXT,
    "lieu" TEXT,
    "residentId" TEXT NOT NULL,
    "creeParId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rendez_vous_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_residentId_fkey" FOREIGN KEY ("residentId") REFERENCES "residents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rendez_vous" ADD CONSTRAINT "rendez_vous_creeParId_fkey" FOREIGN KEY ("creeParId") REFERENCES "employes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
