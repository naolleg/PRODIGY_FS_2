/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Manager` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Employee` MODIFY `imageUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Manager` ADD COLUMN `userId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Manager_userId_key` ON `Manager`(`userId`);

-- AddForeignKey
ALTER TABLE `Manager` ADD CONSTRAINT `Manager_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
