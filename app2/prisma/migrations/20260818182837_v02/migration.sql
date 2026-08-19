/*
  Warnings:

  - The primary key for the `Favorite` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SubscriptionPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `expirationDate` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "StatusName" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Favorite" DROP CONSTRAINT "Favorite_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SubscriptionPlan" DROP CONSTRAINT "SubscriptionPlan_pkey",
ADD COLUMN     "expirationDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "status" "StatusName" NOT NULL DEFAULT 'ACTIVE',
ADD CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Favorite_quoteId_userId_idx" ON "Favorite"("quoteId", "userId");

-- CreateIndex
CREATE INDEX "Quote_userId_idx" ON "Quote"("userId");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "SubscriptionPlan_planId_userId_idx" ON "SubscriptionPlan"("planId", "userId");

-- CreateIndex
CREATE INDEX "User_roleId_idx" ON "User"("roleId");
