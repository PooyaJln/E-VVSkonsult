-- DropForeignKey
ALTER TABLE `accessTokens` DROP FOREIGN KEY `fk2_user_id0`;

-- DropForeignKey
ALTER TABLE `apartments` DROP FOREIGN KEY `fk1_storey_id`;

-- DropForeignKey
ALTER TABLE `buildings` DROP FOREIGN KEY `buildings_ibfk_1`;

-- DropForeignKey
ALTER TABLE `hashedPasses` DROP FOREIGN KEY `fk1_user_id`;

-- DropForeignKey
ALTER TABLE `projectUser` DROP FOREIGN KEY `fk1_project_id`;

-- DropForeignKey
ALTER TABLE `projectUser` DROP FOREIGN KEY `fk_user_id`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `fk_user_id_2`;

-- DropForeignKey
ALTER TABLE `roomBoundaries` DROP FOREIGN KEY `roomBoundaries_ibfk_1`;

-- DropForeignKey
ALTER TABLE `roomBoundaries` DROP FOREIGN KEY `roomBoundaries_ibfk_2`;

-- DropForeignKey
ALTER TABLE `roomBoundaries` DROP FOREIGN KEY `roomBoundaries_ibfk_3`;

-- DropForeignKey
ALTER TABLE `rooms` DROP FOREIGN KEY `rooms_ibfk_1`;

-- DropForeignKey
ALTER TABLE `stories` DROP FOREIGN KEY `fk_stories_1`;

-- DropTable
DROP TABLE `SequelizeMeta`;

-- DropTable
DROP TABLE `accessTokens`;

-- DropTable
DROP TABLE `apartments`;

-- DropTable
DROP TABLE `buildings`;

-- DropTable
DROP TABLE `hashedPasses`;

-- DropTable
DROP TABLE `materials`;

-- DropTable
DROP TABLE `projectUser`;

-- DropTable
DROP TABLE `projects`;

-- DropTable
DROP TABLE `roomBoundaries`;

-- DropTable
DROP TABLE `rooms`;

-- DropTable
DROP TABLE `stories`;

-- DropTable
DROP TABLE `temperatures`;

-- DropTable
DROP TABLE `users`;

