-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: minierp
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(120) NOT NULL,
  `phone` varchar(30) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Laura Pérez','laura@gmail.com','600111222','2026-05-05 08:40:12'),(2,'Marc Torres','marc@gmail.com','600333444','2026-05-05 08:40:12'),(3,'Anna Vidal','anna@gmail.com','600555666','2026-05-05 08:40:12'),(4,'Jordi Serra','jordi@gmail.com','600777888','2026-05-05 08:40:12'),(5,'Marta López','marta@gmail.com','600999000','2026-05-05 08:40:12'),(6,'Carlos Ruiz','carlos@gmail.com','611111111','2026-05-05 08:40:12'),(7,'Paula Gómez','paula@gmail.com','622222222','2026-05-05 08:40:12'),(8,'David Martín','david@gmail.com','633333333','2026-05-05 08:40:12'),(9,'Sara Costa','sara@gmail.com','644444444','2026-05-05 08:40:12'),(10,'Oriol Puig','oriol@gmail.com','655555555','2026-05-05 08:40:12'),(11,'Núria Soler','nuria@gmail.com','666666666','2026-05-05 08:40:12'),(12,'Pau Riera','pau@gmail.com','677777777','2026-05-05 08:40:12'),(13,'Clara Bosch','clara@gmail.com','688888888','2026-05-05 08:40:12'),(14,'Hugo Vidal','hugo@gmail.com','699999999','2026-05-05 08:40:12'),(15,'Eva Ramos','eva@gmail.com','600123456','2026-05-05 08:40:12'),(16,'Joel Navarro','joel@gmail.com','600654321','2026-05-05 08:40:12'),(17,'Irene Flores','irene@gmail.com','600987654','2026-05-05 08:40:12'),(18,'Roger Pons','roger@gmail.com','600246810','2026-05-05 08:40:12'),(19,'Aina Serra','aina@gmail.com','600135790','2026-05-05 08:40:12'),(20,'Nil Ferrer','nil@gmail.com','600192837','2026-05-05 08:40:12'),(21,'Lluc Vidal','lluc@gmail.com','600564738','2026-05-05 08:40:12'),(22,'Berta Mora','berta@gmail.com','600918273','2026-05-05 08:40:12'),(23,'Jan Costa','jan@gmail.com','600817263','2026-05-05 08:40:12'),(24,'Mireia Grau','mireia@gmail.com','600374829','2026-05-05 08:40:12'),(25,'Eric Solé','eric@gmail.com','600918273','2026-05-05 08:40:12');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `category` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `active` tinyint NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Camiseta Azul','Ropa',19.99,50,1,'2026-05-05 08:40:08'),(2,'Camiseta Negra','Ropa',18.99,40,1,'2026-05-05 08:40:08'),(3,'Pantalón Vaquero','Ropa',34.99,25,1,'2026-05-05 08:40:08'),(4,'Sudadera Roja','Ropa',29.99,10,1,'2026-05-05 08:40:08'),(5,'Zapatillas Running','Calzado',59.99,15,1,'2026-05-05 08:40:08'),(6,'Botas Montaña','Calzado',89.99,8,1,'2026-05-05 08:40:08'),(7,'Sandalias Verano','Calzado',24.99,30,1,'2026-05-05 08:40:08'),(8,'Gorra Negra','Accesorios',9.99,60,1,'2026-05-05 08:40:08'),(9,'Mochila Urbana','Accesorios',39.99,12,1,'2026-05-05 08:40:08'),(10,'Cinturón Cuero','Accesorios',14.99,20,1,'2026-05-05 08:40:08'),(11,'Chaqueta Invierno','Ropa',79.99,5,1,'2026-05-05 08:40:08'),(12,'Calcetines Deportivos','Ropa',4.99,100,1,'2026-05-05 08:40:08'),(13,'Guantes Térmicos','Accesorios',12.99,18,1,'2026-05-05 08:40:08'),(14,'Bufanda Lana','Accesorios',11.99,22,1,'2026-05-05 08:40:08'),(15,'Pantalón Chándal','Ropa',22.99,35,1,'2026-05-05 08:40:08'),(16,'Camiseta Blanca','Ropa',14.99,45,1,'2026-05-05 08:40:08'),(17,'Zapatillas Skate','Calzado',49.99,14,1,'2026-05-05 08:40:08'),(18,'Botines Cuero','Calzado',69.99,9,1,'2026-05-05 08:40:08'),(19,'Riñonera Negra','Accesorios',15.99,28,1,'2026-05-05 08:40:08'),(20,'Gafas Sol','Accesorios',19.99,50,1,'2026-05-05 08:40:08'),(21,'Parka Impermeable','Ropa',89.99,6,1,'2026-05-05 08:40:08'),(22,'Camiseta Manga Larga','Ropa',17.99,33,1,'2026-05-05 08:40:08'),(23,'Short Deportivo','Ropa',12.99,27,1,'2026-05-05 08:40:08'),(24,'Zapatillas Casual','Calzado',54.99,16,1,'2026-05-05 08:40:08'),(25,'Bolso Mujer','Accesorios',29.99,13,1,'2026-05-05 08:40:08');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_items`
--

DROP TABLE IF EXISTS `sale_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sale_id` int NOT NULL,
  `product_id` int NOT NULL,
  `qty` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `line_total` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sale_id` (`sale_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `sale_items_ibfk_1` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`),
  CONSTRAINT `sale_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_items`
--

LOCK TABLES `sale_items` WRITE;
/*!40000 ALTER TABLE `sale_items` DISABLE KEYS */;
INSERT INTO `sale_items` VALUES (1,1,10,3,14.99,29.98),(2,1,9,3,39.99,119.97),(3,1,8,3,9.99,19.98),(4,1,7,2,24.99,74.97),(5,1,6,2,89.99,89.99),(6,1,5,1,59.99,59.99),(7,1,4,1,29.99,59.98),(8,1,3,2,34.99,69.98),(9,1,2,3,18.99,56.97),(10,1,1,2,19.99,39.98),(11,2,10,2,14.99,14.99),(12,2,9,2,39.99,79.98),(13,2,8,3,9.99,29.97),(14,2,7,1,24.99,24.99),(15,2,6,2,89.99,89.99),(16,2,5,2,59.99,179.97),(17,2,4,1,29.99,59.98),(18,2,3,2,34.99,34.99),(19,2,2,3,18.99,37.98),(20,2,1,1,19.99,19.99),(21,3,10,3,14.99,14.99),(22,3,9,1,39.99,39.99),(23,3,8,1,9.99,9.99),(24,3,7,3,24.99,49.98),(25,3,6,3,89.99,269.97),(26,3,5,2,59.99,179.97),(27,3,4,3,29.99,89.97),(28,3,3,2,34.99,104.97),(29,3,2,3,18.99,37.98),(30,3,1,3,19.99,19.99),(31,4,10,1,14.99,29.98),(32,4,9,1,39.99,79.98),(33,4,8,1,9.99,19.98),(34,4,7,3,24.99,74.97),(35,4,6,3,89.99,89.99),(36,4,5,1,59.99,179.97),(37,4,4,1,29.99,29.99),(38,4,3,1,34.99,104.97),(39,4,2,3,18.99,56.97),(40,4,1,2,19.99,19.99),(41,5,10,1,14.99,29.98),(42,5,9,3,39.99,39.99),(43,5,8,3,9.99,29.97),(44,5,7,1,24.99,49.98),(45,5,6,2,89.99,179.98),(46,5,5,3,59.99,179.97),(47,5,4,1,29.99,59.98),(48,5,3,1,34.99,104.97),(49,5,2,2,18.99,37.98),(50,5,1,2,19.99,59.97);
/*!40000 ALTER TABLE `sale_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NOT NULL,
  `sale_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `payment_method` varchar(50) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales`
--

LOCK TABLES `sales` WRITE;
/*!40000 ALTER TABLE `sales` DISABLE KEYS */;
INSERT INTO `sales` VALUES (1,1,'2026-05-05 10:40:20','Tarjeta',621.79),(2,2,'2026-05-05 10:40:20','Tarjeta',572.83),(3,3,'2026-05-05 10:40:20','Tarjeta',817.80),(4,4,'2026-05-05 10:40:20','Tarjeta',686.79),(5,5,'2026-05-05 10:40:20','Tarjeta',772.77),(6,6,'2026-05-05 10:40:20','Tarjeta',0.00),(7,7,'2026-05-05 10:40:20','Tarjeta',0.00),(8,8,'2026-05-05 10:40:20','Tarjeta',0.00),(9,9,'2026-05-05 10:40:20','Tarjeta',0.00),(10,10,'2026-05-05 10:40:20','Tarjeta',0.00),(11,11,'2026-05-05 10:40:20','Tarjeta',0.00),(12,12,'2026-05-05 10:40:20','Tarjeta',0.00),(13,13,'2026-05-05 10:40:20','Tarjeta',0.00),(14,14,'2026-05-05 10:40:20','Tarjeta',0.00),(15,15,'2026-05-05 10:40:20','Tarjeta',0.00),(16,16,'2026-05-05 10:40:20','Tarjeta',0.00),(17,17,'2026-05-05 10:40:20','Tarjeta',0.00),(18,18,'2026-05-05 10:40:20','Tarjeta',0.00),(19,19,'2026-05-05 10:40:20','Tarjeta',0.00),(20,20,'2026-05-05 10:40:20','Tarjeta',0.00),(21,21,'2026-05-05 10:40:20','Tarjeta',0.00),(22,22,'2026-05-05 10:40:20','Tarjeta',0.00),(23,23,'2026-05-05 10:40:20','Tarjeta',0.00),(24,24,'2026-05-05 10:40:20','Tarjeta',0.00),(25,25,'2026-05-05 10:40:20','Tarjeta',0.00);
/*!40000 ALTER TABLE `sales` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-05 11:36:06
