/*
  Warnings:

  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `activeStatus` ENUM('ACTIVE', 'DEACTIVATED', 'PENDING') NOT NULL DEFAULT 'ACTIVE',
    ADD COLUMN `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    ADD COLUMN `otp` VARCHAR(191) NULL,
    ADD COLUMN `otpCreatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `otpExpiry` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);
