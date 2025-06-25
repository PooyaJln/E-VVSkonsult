-- MySQL dump 10.13  Distrib 8.0.34, for Linux (x86_64)
--
-- Host: localhost    Database: heatLossApp
-- ------------------------------------------------------
-- Server version	8.0.34-0ubuntu0.22.04.1

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
-- Table structure for table `SequelizeMeta`
--

-- DROP TABLE IF EXISTS `SequelizeMeta`;
-- /*!40101 SET @saved_cs_client     = @@character_set_client */;
-- /*!50503 SET character_set_client = utf8mb4 */;
-- CREATE TABLE `SequelizeMeta` (
--   `name` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
--   PRIMARY KEY (`name`),
--   UNIQUE KEY `name` (`name`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
-- /*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

-- LOCK TABLES `SequelizeMeta` WRITE;
-- /*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
-- /*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
-- UNLOCK TABLES;

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
  CONSTRAINT `apartments_ibfk_1` FOREIGN KEY (`storey_id`) REFERENCES `stories` (`storey_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartments`
--

LOCK TABLES `apartments` WRITE;
/*!40000 ALTER TABLE `apartments` DISABLE KEYS */;
INSERT INTO `apartments` VALUES (3,'4-1101',2),(4,'4-1102',2),(5,'1101',3),(6,'1102',3),(8,'4-1103',2),(12,'4-1105',2),(13,'4-1104',2);
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
  CONSTRAINT `buildings_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buildings`
--

LOCK TABLES `buildings` WRITE;
/*!40000 ALTER TABLE `buildings` DISABLE KEYS */;
INSERT INTO `buildings` VALUES (1,'A',18),(2,'C',18),(3,'D',18),(4,'E',18),(5,'F',19),(6,'G',19),(7,'H',19),(8,'I',19),(9,'B',19),(10,'A',17),(11,'B',17),(12,'C',17),(13,'D',17),(24,'AA',12),(25,'BB',12),(26,'CC',12),(67,'F',18),(68,'DD',12),(69,'D2',21);
/*!40000 ALTER TABLE `buildings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `components`
--

DROP TABLE IF EXISTS `components`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `components` (
  `component_id` int NOT NULL AUTO_INCREMENT,
  `component_name` varchar(255) NOT NULL,
  `component_categ` varchar(255) NOT NULL,
  `component_uvalue` float NOT NULL,
  `component_area` float DEFAULT NULL,
  `component_qinf` int DEFAULT NULL,
  `project_id` int DEFAULT NULL,
  PRIMARY KEY (`component_id`),
  UNIQUE KEY `component_name` (`component_name`),
  UNIQUE KEY `component_name_2` (`component_name`),
  UNIQUE KEY `component_name_3` (`component_name`),
  UNIQUE KEY `component_name_4` (`component_name`),
  UNIQUE KEY `component_name_5` (`component_name`),
  KEY `fk_components_1_idx` (`component_qinf`),
  KEY `fk_components_1_idx1` (`project_id`),
  CONSTRAINT `components_ibfk_1` FOREIGN KEY (`component_qinf`) REFERENCES `thermalParameters` (`parameter_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_components_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `components`
--

LOCK TABLES `components` WRITE;
/*!40000 ALTER TABLE `components` DISABLE KEYS */;
INSERT INTO `components` VALUES (5,'fönster1','window',1.2,2,1,18),(10,'innervägg','wall',0.3,NULL,NULL,18),(11,'yttervägg','wall',0.3,NULL,1,18),(17,'balkongsdörr','door',1.1,NULL,NULL,18),(20,'entrédörr','door',1.2,3,1,18),(26,'betongvägg','wall',0.41,NULL,NULL,18),(27,'garageplatta','roof/floor slab',0.35,NULL,NULL,19),(28,'garageplatta2','roof/floor slab',0.05,NULL,NULL,19),(45,'test wall','wall',3,NULL,NULL,18),(46,'test window','wall',1,NULL,1,18);
/*!40000 ALTER TABLE `components` ENABLE KEYS */;
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
  CONSTRAINT `fk1_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashedPasses`
--

LOCK TABLES `hashedPasses` WRITE;
/*!40000 ALTER TABLE `hashedPasses` DISABLE KEYS */;
INSERT INTO `hashedPasses` VALUES (18,'$2b$10$uZm8NjFWSuaLSmNQ6nncRe6z8JWcXSqmR15Nu7CRHnPiWi2GC0d3m',8),(19,'$2b$10$cS2XiBHfN6wBxoOxfFMeyu55N3MRyxF/TRabYQavXjFAp70e4pc0e',9),(20,'$2b$10$hGeAja58lvPCwi3MgeYssOfLstjQswBpcgmGhf8t4/gO9SzQWaI.C',12),(21,'$2b$10$r/Uz6iI1UBiCUJzfU0vFJu9xAnSYdaT5cHbWcF79uewyxpmamwoIq',16),(22,'$2b$10$mLZJVyGtTUQklZ1VpuJnLOMLcIZXIlnEcMEVQOal.mbApMz6Mz6fu',17),(26,'$2b$10$s7TR9lmxQa9Jb2pavhUedeH/7pXcgkh1Helt4apQnTOsHs5pS4L5i',111);
/*!40000 ALTER TABLE `hashedPasses` ENABLE KEYS */;
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
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=215 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (12,'Närheten2',8),(13,'skildra1',8),(14,'Årsta Park',8),(16,'Högaffeln5',9),(17,'Ångloket',9),(18,'Skildra',8),(19,'BRF Romanen',12),(21,'WAP',16);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roomBoundaries`
--

DROP TABLE IF EXISTS `roomBoundaries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roomBoundaries` (
  `boundary_id` int NOT NULL AUTO_INCREMENT,
  `boundary_name` varchar(255) DEFAULT NULL,
  `room1_id` int NOT NULL,
  `boundary_type` varchar(255) NOT NULL,
  `uvalue_id` int NOT NULL,
  `length` int DEFAULT NULL,
  `width` int DEFAULT NULL,
  `area` float NOT NULL,
  `out_temp_id` int NOT NULL,
  `has_openings` tinyint(1) DEFAULT '0',
  `boundary_parent_id` int DEFAULT NULL,
  `is_shared` tinyint(1) DEFAULT NULL,
  `room2_id` int DEFAULT NULL,
  `ground_connected` tinyint(1) DEFAULT '0',
  `is_between0_1` tinyint(1) DEFAULT '0',
  `is_between1_6` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`boundary_id`),
  KEY `uvalue_id` (`uvalue_id`),
  KEY `out_temp_id` (`out_temp_id`),
  KEY `boundary_parent_id` (`boundary_parent_id`),
  KEY `roomBoundaries_ibfk_140` (`room1_id`),
  CONSTRAINT `roomBoundaries_ibfk_138` FOREIGN KEY (`uvalue_id`) REFERENCES `components` (`component_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roomBoundaries_ibfk_139` FOREIGN KEY (`out_temp_id`) REFERENCES `temperatures` (`temperature_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `roomBoundaries_ibfk_140` FOREIGN KEY (`room1_id`) REFERENCES `rooms` (`room_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roomBoundaries`
--

LOCK TABLES `roomBoundaries` WRITE;
/*!40000 ALTER TABLE `roomBoundaries` DISABLE KEYS */;
INSERT INTO `roomBoundaries` VALUES (11,'wall 1',1,'wall',11,NULL,NULL,10,1,0,NULL,NULL,NULL,0,0,0),(12,'wall 2',1,'wall',11,NULL,NULL,10,1,1,NULL,NULL,NULL,0,0,0),(13,'wall 3',1,'wall',11,NULL,NULL,10,1,1,NULL,NULL,NULL,0,0,0),(21,'window 2',1,'window',5,NULL,NULL,1.6,1,0,12,NULL,NULL,0,0,0),(22,'window 3',1,'window',5,NULL,NULL,2,1,0,12,NULL,NULL,0,0,0),(23,'window 1',1,'window',5,NULL,NULL,4,1,0,12,NULL,NULL,0,0,0),(24,'wall12',1,'wall',11,NULL,NULL,15,1,0,NULL,NULL,NULL,0,0,0),(25,'wall nord',2,'wall',11,NULL,NULL,20,1,1,NULL,NULL,NULL,0,0,0),(26,'wall söder',2,'wall',11,NULL,NULL,25,1,0,NULL,NULL,NULL,0,0,0);
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
  `room_temperature` int NOT NULL,
  `apartment_id` int NOT NULL,
  PRIMARY KEY (`room_id`),
  KEY `fk_apartmentId_idx` (`apartment_id`),
  KEY `fk_room_temperature_idx` (`room_temperature`),
  CONSTRAINT `rooms_ibfk_66` FOREIGN KEY (`room_temperature`) REFERENCES `temperatures` (`temperature_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rooms_ibfk_67` FOREIGN KEY (`apartment_id`) REFERENCES `apartments` (`apartment_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'vardagsrum',2,3),(2,'sovrum',2,3),(3,'arbetsrum',2,3),(4,'kök',2,3),(5,'litet sovrum',2,3),(6,'badrum',2,3),(12,'vardagsrum',2,4),(13,'vardagsrum',2,5);
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
  `storey_name` varchar(255) NOT NULL,
  `building_id` int NOT NULL,
  PRIMARY KEY (`storey_id`),
  KEY `fk_Storey_1_idx` (`building_id`),
  CONSTRAINT `stories_ibfk_1` FOREIGN KEY (`building_id`) REFERENCES `buildings` (`building_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stories`
--

LOCK TABLES `stories` WRITE;
/*!40000 ALTER TABLE `stories` DISABLE KEYS */;
INSERT INTO `stories` VALUES (2,'10',1),(3,'11',1),(4,'12',1),(5,'13',1),(6,'14',1),(7,'15',1),(9,'16',1),(14,'0130',9),(15,'0140',9),(16,'0150',9),(17,'009',2),(18,'010',2),(19,'011',2),(20,'012',2),(21,'013',2),(22,'014',2),(23,'015',2),(24,'016',2),(25,'017',2),(28,'09',1),(30,'17',1),(31,'19',1),(32,'09',5),(33,'10',5),(34,'11',5),(35,'12',5);
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
  `temperature_name` varchar(255) NOT NULL,
  `temperature_value` int NOT NULL,
  `project_id` int NOT NULL,
  PRIMARY KEY (`temperature_id`),
  UNIQUE KEY `temperature_name` (`temperature_name`),
  UNIQUE KEY `temperature_name_2` (`temperature_name`),
  UNIQUE KEY `temperature_name_3` (`temperature_name`),
  UNIQUE KEY `temperature_name_4` (`temperature_name`),
  UNIQUE KEY `temperature_name_5` (`temperature_name`),
  KEY `fk_temperatures_1_idx` (`project_id`),
  CONSTRAINT `fk_temperatures_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temperatures`
--

LOCK TABLES `temperatures` WRITE;
/*!40000 ALTER TABLE `temperatures` DISABLE KEYS */;
INSERT INTO `temperatures` VALUES (1,'DUT',-20,18),(2,'lägenhet',21,18),(6,'korridor',18,18),(8,'UC',10,18),(9,'fläktrum',18,18),(10,'garage',8,18),(11,'förråd',10,18),(12,'källare',18,18),(16,'källare4',21,19),(17,'grundVattenFrysningsTemp',5,18),(22,'fläktrum3',18,19);
/*!40000 ALTER TABLE `temperatures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `thermalParameters`
--

DROP TABLE IF EXISTS `thermalParameters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thermalParameters` (
  `parameter_id` int NOT NULL AUTO_INCREMENT,
  `parameter_name` varchar(255) NOT NULL,
  `parameter_value` float NOT NULL,
  `parameter_unit` varchar(255) DEFAULT NULL,
  `project_id` int NOT NULL,
  PRIMARY KEY (`parameter_id`),
  KEY `fk_thermalParameters_1_idx` (`project_id`),
  KEY `fk2_thermalParameters_idx` (`project_id`),
  CONSTRAINT `fk2_thermalParameters` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thermalParameters`
--

LOCK TABLES `thermalParameters` WRITE;
/*!40000 ALTER TABLE `thermalParameters` DISABLE KEYS */;
INSERT INTO `thermalParameters` VALUES (1,'Specific infiltration flow',0.04,'l/s-m2',18),(2,'thermal bridge coeff',1.2,NULL,18),(3,'air density',1.2,'kg/m3',18),(4,'specific heat capacity',1000,'J/kg.C',18),(5,'Specific infiltration flow',0.06,NULL,12),(6,'thermal bridge coeff',1,NULL,12),(7,'air density',2,NULL,12),(8,'specific heat capacity',0.05,NULL,12),(9,'Specific infiltration flow',2,NULL,21),(10,'Specific infiltration flow',0.12,NULL,19),(11,'thermal bridge coeff',1.2,NULL,19),(12,'air density',1.2,NULL,19),(13,'specific heat capacity',1000,NULL,19);
/*!40000 ALTER TABLE `thermalParameters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(255) NOT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`),
  UNIQUE KEY `user_email` (`user_email`),
  UNIQUE KEY `user_email_2` (`user_email`),
  UNIQUE KEY `user_email_3` (`user_email`),
  UNIQUE KEY `user_email_4` (`user_email`),
  UNIQUE KEY `user_email_5` (`user_email`),
  UNIQUE KEY `user_email_6` (`user_email`),
  UNIQUE KEY `user_email_7` (`user_email`),
  UNIQUE KEY `user_email_8` (`user_email`),
  UNIQUE KEY `user_email_9` (`user_email`),
  UNIQUE KEY `user_email_10` (`user_email`),
  UNIQUE KEY `user_email_11` (`user_email`),
  UNIQUE KEY `user_email_12` (`user_email`),
  UNIQUE KEY `user_email_13` (`user_email`),
  UNIQUE KEY `user_email_14` (`user_email`),
  UNIQUE KEY `user_email_15` (`user_email`),
  UNIQUE KEY `user_email_16` (`user_email`),
  UNIQUE KEY `user_email_17` (`user_email`),
  UNIQUE KEY `user_email_18` (`user_email`),
  UNIQUE KEY `user_email_19` (`user_email`),
  UNIQUE KEY `user_email_20` (`user_email`),
  UNIQUE KEY `user_email_21` (`user_email`),
  UNIQUE KEY `user_email_22` (`user_email`),
  UNIQUE KEY `user_email_23` (`user_email`),
  UNIQUE KEY `user_email_24` (`user_email`),
  UNIQUE KEY `user_email_25` (`user_email`),
  UNIQUE KEY `user_email_26` (`user_email`),
  UNIQUE KEY `user_email_27` (`user_email`),
  UNIQUE KEY `user_email_28` (`user_email`),
  UNIQUE KEY `user_email_29` (`user_email`),
  UNIQUE KEY `user_email_30` (`user_email`),
  UNIQUE KEY `user_email_31` (`user_email`),
  UNIQUE KEY `user_email_32` (`user_email`),
  UNIQUE KEY `user_email_33` (`user_email`),
  UNIQUE KEY `user_email_34` (`user_email`),
  UNIQUE KEY `user_email_35` (`user_email`),
  UNIQUE KEY `user_email_36` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'m.r@gmail.com','Project Manager'),(9,'p.j@gmail.com','Project engineer'),(11,'f.r@gmail.com','Project engineer'),(12,'t.r@gmail.com','Project engineer'),(16,'n.j@gmail.com','Project engineer'),(17,'s.s@gmail.com','Project engineer'),(111,'m.j@gmail.com','Project manager');
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

-- Dump completed on 2023-09-27 18:59:55
