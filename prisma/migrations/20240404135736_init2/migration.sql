/*
  Warnings:

  - You are about to drop the `cashFlow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cashFlow" DROP CONSTRAINT "cashFlow_cashFlowId_fkey";

-- DropTable
DROP TABLE "cashFlow";

-- CreateTable
CREATE TABLE "CashFlow" (
    "id" SERIAL NOT NULL,
    "inflow" BIGINT NOT NULL,
    "outflow" BIGINT NOT NULL,
    "balance" BIGINT NOT NULL,
    "cashFlowId" INTEGER NOT NULL,

    CONSTRAINT "CashFlow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CashFlow" ADD CONSTRAINT "CashFlow_cashFlowId_fkey" FOREIGN KEY ("cashFlowId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
