-- DropForeignKey
ALTER TABLE `LeaveRequest` DROP FOREIGN KEY `LeaveRequest_employeeId_fkey`;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('ADMIN', 'EMPLOYEE') NOT NULL DEFAULT 'EMPLOYEE';
