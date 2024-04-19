/*
  Warnings:

  - You are about to drop the column `balance` on the `CashFlow` table. All the data in the column will be lost.
  - You are about to drop the column `inflow` on the `CashFlow` table. All the data in the column will be lost.
  - You are about to drop the column `outflow` on the `CashFlow` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `amount` to the `CashFlow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `CashFlow` table without a default value. This is not possible if the table is not empty.
  - Added the required column `note` to the `CashFlow` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_category_key";

-- AlterTable
ALTER TABLE "CashFlow" DROP COLUMN "balance",
DROP COLUMN "inflow",
DROP COLUMN "outflow",
ADD COLUMN     "amount" BIGINT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "note" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "category";
