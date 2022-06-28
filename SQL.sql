CREATE DATABASE  IF NOT EXISTS `supermarket_project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `supermarket_project`;
-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: supermarket_project
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `cart_products`
--

DROP TABLE IF EXISTS `cart_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `total_price` double(6,2) NOT NULL,
  `cart_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_cartId_idx1` (`cart_id`),
  KEY `FK_productId_idx` (`product_id`),
  CONSTRAINT `FK_cartId` FOREIGN KEY (`cart_id`) REFERENCES `shopping_carts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_productId` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_products`
--

LOCK TABLES `cart_products` WRITE;
/*!40000 ALTER TABLE `cart_products` DISABLE KEYS */;
INSERT INTO `cart_products` VALUES (59,19,2,6.00,15),(61,14,4,10.40,15),(62,12,1,41.00,15),(63,10,2,18.00,15),(64,20,5,10.00,15),(65,8,4,12.00,16),(66,9,2,5.80,16),(67,2,2,3.00,16),(68,18,4,12.00,16),(70,19,4,12.00,16);
/*!40000 ALTER TABLE `cart_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_name_UNIQUE` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (3,'Breads'),(4,'Fruits'),(2,'Meat & Chicken'),(1,'Milk & Dairy'),(6,'Snacks'),(5,'Vegetables');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `cart_id` int NOT NULL,
  `cart_total_price` double(8,2) NOT NULL,
  `city` varchar(45) NOT NULL,
  `street_address` varchar(100) NOT NULL,
  `delivery_date` date NOT NULL,
  `order_date` date NOT NULL DEFAULT (curdate()),
  `credit_card_digits` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,1,51.00,'Tel Aviv','Arlozoroff','2022-07-10','2022-06-27','1234'),(2,2,3,9.20,'Tel Aviv','Arlozoroff','2022-07-10','2022-06-27','3333'),(3,3,5,71.30,'Jerusalem','Levi Eshkol 3','2022-07-10','2022-06-27','1111'),(4,4,6,63.70,'Ashdod','Derech HaMelech','2022-06-29','2022-06-27','1111'),(5,5,8,16.60,'Rishon LeZion','Jabotinsky 56','2022-06-30','2022-06-27','2222'),(6,6,9,80.80,'Haifa','Yitzhak Rabin','2022-06-29','2022-06-27','6666'),(7,7,10,28.20,'Beersheba','Weizmann 7','2022-06-28','2022-06-27','0000'),(8,4,11,93.20,'Ashdod','Derech HaMelech','2022-06-28','2022-06-27','1111'),(9,6,14,29.00,'Haifa','Yitzhak Rabin','2022-06-28','2022-06-27','2222');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `category_id` int NOT NULL,
  `price` double(6,2) NOT NULL,
  `image_url` varchar(250) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_categoryId_idx` (`category_id`),
  CONSTRAINT `FK_categoryId` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Milk 3% Fat',1,2.00,'/assets/images/products/milk.png'),(2,'Fruity Yogurt 3% Fat',1,1.50,'/assets/images/products/yogurt.png'),(3,'Cottage Cheese 5% Fat',1,2.00,'/assets/images/products/cottage-cheese.png'),(4,'Cheese 28% Fat',1,8.00,'/assets/images/products/cheese.png'),(5,'Tomatoes (8 Count)',5,1.70,'/assets/images/products/tomatoes.png'),(6,'Bell Pepper (3 Count)',5,3.00,'/assets/images/products/bell-peppers.png'),(7,'Green Apple (3 Count)',4,3.00,'/assets/images/products/green-apples.png'),(8,'Red Apple (3 Count)',4,3.00,'/assets/images/products/red-apples.png'),(9,'Avocados (2 Count)',4,2.90,'/assets/images/products/avocados.png'),(10,'Chicken Breast',2,9.00,'/assets/images/products/chicken-breast.png'),(11,'Whole Chicken',2,5.50,'/assets/images/products/whole-chicken.png'),(12,'Entrecôte',2,41.00,'/assets/images/products/entrecote.png'),(13,'Denver Steak',2,29.00,'/assets/images/products/denver-cut.png'),(14,'Buns (6 Count)',3,2.60,'/assets/images/products/buns.png'),(15,'Tortillas',3,3.00,'/assets/images/products/tortillas.png'),(16,'Whole Wheat Bread',3,4.00,'/assets/images/products/whole-wheat-bread.png'),(17,'Carrots',5,1.00,'/assets/images/products/carrots.png'),(18,'Crunchy Chips',6,3.00,'/assets/images/products/crunchy-chips.png'),(19,'Spicy Crunchy Chips',6,3.00,'/assets/images/products/spicy-crunchy-chips.png'),(20,'Chocolate & Hazelnuts',6,2.00,'/assets/images/products/chocolate-hazelnuts.png'),(21,'Grapes Mix',4,8.00,'/assets/images/products/grapes-mix.png');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping_carts`
--

DROP TABLE IF EXISTS `shopping_carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping_carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `creation_date` date NOT NULL DEFAULT (curdate()),
  PRIMARY KEY (`id`),
  KEY `FK_userId_idx` (`user_id`),
  CONSTRAINT `FK_userId` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping_carts`
--

LOCK TABLES `shopping_carts` WRITE;
/*!40000 ALTER TABLE `shopping_carts` DISABLE KEYS */;
INSERT INTO `shopping_carts` VALUES (15,8,'2022-06-27'),(16,4,'2022-06-27');
/*!40000 ALTER TABLE `shopping_carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(100) NOT NULL,
  `id_number` int NOT NULL,
  `password` varchar(45) NOT NULL,
  `city` varchar(45) DEFAULT NULL,
  `street_address` varchar(100) DEFAULT NULL,
  `user_type` varchar(5) NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`,`id_number`),
  UNIQUE KEY `id_number_UNIQUE` (`id_number`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Daniel','Sternin','daniel@fresh-choice.com',123456782,'08d8ea7e18612be3a00ce1117bfd6664','Ashdod','Dizengoff','ADMIN'),(2,'Shlomo','Peretz','user@fresh-choice.com',123412348,'672d8c8644ae75336ca3039b49e29b02','Tel Aviv','Arlozoroff','USER'),(3,'Rami','Levi','rami@rami-levi.co.il',222222226,'9acc0980cbdf74a77ded6c5888b4d943','Jerusalem','Levi Eshkol 3','USER'),(4,'Agam','Cohen','agam492@gmail.com',444444442,'23da63aa88c1c88e8d09894ed817c2f9','Ashdod','Derech HaMelech','USER'),(5,'Ori','Aviv','ori56@walla.com',555555556,'2c7f1060c2a4d7f6efc10cf5e5590199','Rishon LeZion','Jabotinsky 56','USER'),(6,'Ohad','Katz','ohad.katz@gmail.com',777777772,'bcf611265adebe177c60540437764042','Haifa','Yitzhak Rabin','USER'),(7,'Tal','Schwartz','tal111@gmail.com',88888888,'0304fc1d83c1e59e0d37ebb9891e61d9','Beersheba','Weizmann 7','USER'),(8,'Omer','Yosef','omery19@walla.com',123123127,'75fa0dec3dc8cc7b310854964ad5f7e0','Holon','Arlozorov 6','USER');
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

-- Dump completed on 2022-06-27 18:50:02
