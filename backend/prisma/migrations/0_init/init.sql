-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: heatLossApp
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `heatLossApp`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `heatLossApp` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `heatLossApp`;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accessTokens`
--

DROP TABLE IF EXISTS `accessTokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accessTokens` (
  `user_id` int NOT NULL,
  `accessToken` varchar(256) NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk2_user_id0` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accessTokens`
--

LOCK TABLES `accessTokens` WRITE;
/*!40000 ALTER TABLE `accessTokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `accessTokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartments`
--

DROP TABLE IF EXISTS `apartments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apartments` (
  `apartment_id` int NOT NULL AUTO_INCREMENT,
  `apartment_name` varchar(255) NOT NULL,
  `storey_id` int NOT NULL,
  PRIMARY KEY (`apartment_id`),
  KEY `fk1_storey_id` (`storey_id`),
  CONSTRAINT `fk1_storey_id` FOREIGN KEY (`storey_id`) REFERENCES `stories` (`storey_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartments`
--

LOCK TABLES `apartments` WRITE;
/*!40000 ALTER TABLE `apartments` DISABLE KEYS */;
/*!40000 ALTER TABLE `apartments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buildings`
--

DROP TABLE IF EXISTS `buildings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buildings` (
  `building_id` int NOT NULL AUTO_INCREMENT,
  `building_name` varchar(255) NOT NULL,
  `project_id` int NOT NULL,
  PRIMARY KEY (`building_id`),
  KEY `fk_buildings_1_idx` (`project_id`),
  CONSTRAINT `buildings_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buildings`
--

LOCK TABLES `buildings` WRITE;
/*!40000 ALTER TABLE `buildings` DISABLE KEYS */;
INSERT INTO `buildings` VALUES (1,'A',18),(2,'C',18),(3,'D',18),(4,'E',18),(5,'F',19),(6,'G',19),(7,'H',19),(8,'I',19),(9,'B',18),(10,'A',17),(11,'B',17),(12,'C',17),(13,'D',17),(16,'CC',18),(17,'DD',18),(18,'GG',18),(19,'L',18);
/*!40000 ALTER TABLE `buildings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hashedPasses`
--

DROP TABLE IF EXISTS `hashedPasses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hashedPasses` (
  `hashed_pass_id` int NOT NULL AUTO_INCREMENT,
  `hashed_pass` varchar(256) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`hashed_pass_id`),
  KEY `fk1_user_id_idx` (`user_id`),
  CONSTRAINT `fk1_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashedPasses`
--

LOCK TABLES `hashedPasses` WRITE;
/*!40000 ALTER TABLE `hashedPasses` DISABLE KEYS */;
INSERT INTO `hashedPasses` VALUES (18,'$2b$10$uZm8NjFWSuaLSmNQ6nncRe6z8JWcXSqmR15Nu7CRHnPiWi2GC0d3m',8),(19,'$2b$10$cS2XiBHfN6wBxoOxfFMeyu55N3MRyxF/TRabYQavXjFAp70e4pc0e',9),(20,'$2b$10$hGeAja58lvPCwi3MgeYssOfLstjQswBpcgmGhf8t4/gO9SzQWaI.C',12),(21,'$2b$10$r/Uz6iI1UBiCUJzfU0vFJu9xAnSYdaT5cHbWcF79uewyxpmamwoIq',16),(22,'$2b$10$mLZJVyGtTUQklZ1VpuJnLOMLcIZXIlnEcMEVQOal.mbApMz6Mz6fu',17);
/*!40000 ALTER TABLE `hashedPasses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `material_id` int NOT NULL AUTO_INCREMENT,
  `material_name` varchar(255) NOT NULL,
  `material_categ` varchar(255) NOT NULL,
  `material_u_value` decimal(4,2) NOT NULL,
  PRIMARY KEY (`material_id`),
  UNIQUE KEY `material_name_UNIQUE` (`material_name`),
  UNIQUE KEY `material_name` (`material_name`),
  UNIQUE KEY `material_name_2` (`material_name`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES (5,'fönster','window',0.00),(8,'fönster2','window',0.00),(10,'innervägg','wall',0.00),(11,'yttervägg','wall',0.00),(12,'yttervägg2','wall',0.00),(13,'yttervägg3','wall',0.00),(14,'yttervägg4','wall',0.00),(15,'yttervägg5','wall',0.00),(16,'yttervägg6','wall',0.00),(17,'balkongsdörr','door',0.00),(18,'balkongsdörr1','door',0.00),(19,'balkongsdörr2','door',0.00),(20,'entrédörr','door',0.00),(21,'entrédörr1','door',0.00),(22,'entrédörr2','door',0.00),(23,'entrédörr3','door',0.00),(24,'entrédörr4','door',0.00),(25,'innervägg3','wall',0.00);
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projectUser`
--

DROP TABLE IF EXISTS `projectUser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projectUser` (
  `projectUser_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`projectUser_id`),
  KEY `fk_projectUser_1_idx` (`project_id`),
  KEY `fk_projectUser_2_idx` (`user_id`),
  CONSTRAINT `fk1_project_id` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projectUser`
--

LOCK TABLES `projectUser` WRITE;
/*!40000 ALTER TABLE `projectUser` DISABLE KEYS */;
/*!40000 ALTER TABLE `projectUser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `project_name` varchar(255) NOT NULL,
  `owner_id` int NOT NULL,
  PRIMARY KEY (`project_id`),
  KEY `fk1_owner_id_idx` (`owner_id`),
  CONSTRAINT `fk_user_id_2` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (12,'Närheten5',9),(13,'Närheten6',9),(14,'Årsta Park',9),(16,'Högaffeln5',9),(17,'ångloket',9),(18,'skildra',9),(19,'BRF Romanen',9);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomBoundaries`
--

DROP TABLE IF EXISTS `roomBoundaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomBoundaries` (
  `baundary_id` int NOT NULL AUTO_INCREMENT,
  `baundary_name` varchar(255) DEFAULT NULL,
  `baundary_material` int NOT NULL,
  `baundary_area` int NOT NULL,
  `boundary_length` int DEFAULT NULL,
  `boundary_width` int DEFAULT NULL,
  `boundary_is_shared` tinyint(1) DEFAULT '0',
  `room1_id` int NOT NULL,
  `room2_id` int DEFAULT NULL,
  PRIMARY KEY (`baundary_id`),
  KEY `room2_id` (`room2_id`),
  KEY `roomBoundaries_ibfk_3_idx` (`baundary_material`),
  KEY `roomBoundaries_ibfk_1_idx` (`room1_id`),
  CONSTRAINT `roomBoundaries_ibfk_1` FOREIGN KEY (`room1_id`) REFERENCES `rooms` (`room_id`),
  CONSTRAINT `roomBoundaries_ibfk_2` FOREIGN KEY (`room2_id`) REFERENCES `rooms` (`room_id`),
  CONSTRAINT `roomBoundaries_ibfk_3` FOREIGN KEY (`baundary_material`) REFERENCES `materials` (`material_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomBoundaries`
--

LOCK TABLES `roomBoundaries` WRITE;
/*!40000 ALTER TABLE `roomBoundaries` DISABLE KEYS */;
/*!40000 ALTER TABLE `roomBoundaries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_name` varchar(255) NOT NULL,
  `apartment_id` int NOT NULL,
  PRIMARY KEY (`room_id`),
  KEY `fk_apartmentId_idx` (`apartment_id`),
  CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`apartment_id`) REFERENCES `apartments` (`apartment_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stories`
--

DROP TABLE IF EXISTS `stories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stories` (
  `storey_id` int NOT NULL AUTO_INCREMENT,
  `storey_name` varchar(45) NOT NULL,
  `building_id` int NOT NULL,
  PRIMARY KEY (`storey_id`),
  KEY `fk_Storey_1_idx` (`building_id`),
  CONSTRAINT `fk_stories_1` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`building_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories`
--

LOCK TABLES `stories` WRITE;
/*!40000 ALTER TABLE `stories` DISABLE KEYS */;
INSERT INTO `stories` VALUES (2,'10',1),(3,'11',1),(4,'12',1),(5,'13',1),(6,'14',1),(7,'15',1),(9,'16',1),(14,'0130',9),(15,'0140',9),(16,'0150',9),(17,'009',2),(18,'010',2),(19,'011',2),(20,'012',2),(21,'013',2),(22,'014',2),(23,'015',2),(24,'016',2),(25,'017',2);
/*!40000 ALTER TABLE `stories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `temperatures`
--

DROP TABLE IF EXISTS `temperatures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temperatures` (
  `temperature_id` int NOT NULL AUTO_INCREMENT,
  `temperature_name` varchar(45) NOT NULL,
  `temperature_value` int NOT NULL,
  PRIMARY KEY (`temperature_id`),
  UNIQUE KEY `temperature_name_UNIQUE` (`temperature_name`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temperatures`
--

LOCK TABLES `temperatures` WRITE;
/*!40000 ALTER TABLE `temperatures` DISABLE KEYS */;
INSERT INTO `temperatures` VALUES (6,'korridor',18),(7,'lägenhet',21),(8,'UC',10),(9,'fläktrum',18),(10,'garage',4),(11,'förråd',18),(12,'källare',18),(13,'garage2',8),(14,'garage5',8),(15,'garage6',8),(16,'källare4',21);
/*!40000 ALTER TABLE `temperatures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) NOT NULL,
  `user_role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'m.r@gmail.com','Project Manager'),(9,'p.j@gmail.com','Project engineer'),(11,'f.r@gmail.com','Project engineer'),(12,'t.r@gmail.com','Project engineer'),(16,'n.j@gmail.com','Project engineer'),(17,'s.s@gmail.com','Project engineer');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-09 13:34:42
