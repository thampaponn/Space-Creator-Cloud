/*
  Warnings:

  - You are about to alter the column `user_id` on the `Report` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `image` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Report` DROP FOREIGN KEY `Report_user_id_fkey`;

-- AlterTable
ALTER TABLE `Report` MODIFY `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Room` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Report` ADD CONSTRAINT `Report_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
