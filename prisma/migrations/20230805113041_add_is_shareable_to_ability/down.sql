-- DropForeignKey
ALTER TABLE `Ability` DROP FOREIGN KEY `Ability_ownerId_fkey`;

-- DropTable
DROP TABLE `Character`;

-- DropTable
DROP TABLE `Ability`;

-- CreateTable
CREATE TABLE `ability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `isPassive` BOOLEAN NOT NULL,
    `ownerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Ability_ownerId_fkey`(`ownerId` ASC),
    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id` ASC)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ability` ADD CONSTRAINT `Ability_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

