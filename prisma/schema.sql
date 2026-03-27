-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slug` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `level` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `venue` VARCHAR(191) NOT NULL,        
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,     

    UNIQUE INDEX `Event_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT, 
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,        
    `phone` VARCHAR(191) NOT NULL,        
    `institution` VARCHAR(191) NOT NULL,  
    `eventSlug` VARCHAR(191) NOT NULL,    
    `eventName` VARCHAR(191) NOT NULL,    
    `eventId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Registration_eventSlug_idx`(`eventSlug`),
    INDEX `Registration_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Registration` ADD CONSTRAINT `Registration_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
