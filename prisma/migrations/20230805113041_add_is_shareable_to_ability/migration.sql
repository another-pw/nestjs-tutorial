/*
  Warnings:

  - Added the required column `isShareable` to the `Ability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ability` ADD COLUMN `isShareable` BOOLEAN NOT NULL;
