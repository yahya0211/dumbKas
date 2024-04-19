/*
  Warnings:

  - Added the required column `imageCategory` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "imageCategory" TEXT NOT NULL;
