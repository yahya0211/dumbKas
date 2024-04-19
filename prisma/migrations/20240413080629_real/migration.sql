/*
  Warnings:

  - You are about to drop the column `amount` on the `CashFlow` table. All the data in the column will be lost.
  - You are about to drop the column `cashFlowId` on the `CashFlow` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `CashFlow` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `CashFlow` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to alter the column `amount` on the `Transaction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - A unique constraint covering the columns `[userId]` on the table `CashFlow` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameCategory]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `balance` to the `CashFlow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `CashFlow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CashFlow" DROP CONSTRAINT "CashFlow_cashFlowId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_transactionId_fkey";

-- AlterTable
ALTER TABLE "CashFlow" DROP COLUMN "amount",
DROP COLUMN "cashFlowId",
DROP COLUMN "date",
DROP COLUMN "note",
ADD COLUMN     "balance" INTEGER NOT NULL,
ADD COLUMN     "inFlow" INTEGER,
ADD COLUMN     "outFlow" INTEGER,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactionId",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "CashFlow_userId_key" ON "CashFlow"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Category_nameCategory_key" ON "Category"("nameCategory");

-- AddForeignKey
ALTER TABLE "CashFlow" ADD CONSTRAINT "CashFlow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_category_fkey" FOREIGN KEY ("category") REFERENCES "Category"("nameCategory") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
