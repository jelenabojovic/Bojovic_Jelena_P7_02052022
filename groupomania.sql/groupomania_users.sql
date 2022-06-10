CREATE DATABASE  IF NOT EXISTS `groupomania` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `groupomania`;
-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `service` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Jelena','Bojovic','jelenabojovic@groupomania.fr','$2b$10$giAlOFwJ1Pto2OfjIp/sVOV7E/dhlGey2CIB9CcTkwhNpGhd0u/Qm','20190305_1128561653741836590.jpg','traductrice',0,'2022-05-28 12:42:50','2022-06-03 13:26:25'),(3,'Penélope','Cruz','penelopecruz@groupomania.fr','$2b$10$bOxvhrnCxMF8rNYAl8Iu.eEwhed/IIg2k3quIgh4NaqkttsRomygC','mandira-banik-nlkCyQvV4ns-unsplash1654013030760.jpg','traductrice',0,'2022-05-31 16:02:00','2022-05-31 16:03:50'),(9,'Hermione','Granger','h.granger@groupomania.fr','$2b$10$TlBEtnu9zcEFtFgGAqYMJOQ7H75oNZX2aEE7kco5onmOU32.d21rW','davide-aracri-_SkbvL-oAfI-unsplash1654687383137.jpg','formatrice',0,'2022-06-08 11:19:17','2022-06-08 11:23:03'),(14,'Admin','Admin','admin@groupomania.fr','$2b$10$0vooA6tw8I/573eIny2yt.B6wpyoyPAZAwN7c1SebWF2q5KJNTwFa',NULL,'admin',1,'2022-06-09 14:35:21','2022-06-10 15:47:39'),(23,'Harry','Potter','harrypotter@groupomania.fr','$2b$10$uBiTfC394GhQkvlyS/yFRutLjS9PlvmzzhTejVwCSpNnrvXm07YnW','mike-swigunski-kocb5DuGmRs-unsplash1654878521510.jpg','traducteur',0,'2022-06-10 14:41:20','2022-06-10 16:28:41');
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

-- Dump completed on 2022-06-10 18:42:15
