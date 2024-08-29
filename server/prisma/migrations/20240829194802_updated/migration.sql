-- DropForeignKey
ALTER TABLE `Employee` DROP FOREIGN KEY `Employee_deptId_fkey`;

-- AddForeignKey
ALTER TABLE `Employee` ADD CONSTRAINT `Employee_deptId_fkey` FOREIGN KEY (`deptId`) REFERENCES `Department`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
