/*
  Warnings:

  - You are about to drop the column `type` on the `movements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `movements` DROP COLUMN `type`,
    ADD COLUMN `balanceType` ENUM('INPUT', 'OUTPUT') NOT NULL DEFAULT 'INPUT';
