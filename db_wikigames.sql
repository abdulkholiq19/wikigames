-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 07, 2021 at 04:34 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_wikigames`
--

-- --------------------------------------------------------

--
-- Table structure for table `heroes_tb`
--

CREATE TABLE `heroes_tb` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `type_id` int(11) DEFAULT NULL,
  `photo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `heroes_tb`
--

INSERT INTO `heroes_tb` (`id`, `name`, `type_id`, `photo`) VALUES
(2, 'Holy Knight Joy', 3, '1638888946180-a-playlist-5.jpeg'),
(3, 'The Gizzly', 3, '1638887030692-a-playlist-2.jpeg'),
(5, 'Great Hero Study', 1, '1638888869788-a-playlist-4.jpeg'),
(6, 'Dick Clark', 3, '1638889933259-ab.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `type_tb`
--

CREATE TABLE `type_tb` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `type_tb`
--

INSERT INTO `type_tb` (`id`, `name`) VALUES
(1, 'Hp'),
(2, 'Agility'),
(3, 'Strength'),
(4, 'Scaler');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `heroes_tb`
--
ALTER TABLE `heroes_tb`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `type_tb`
--
ALTER TABLE `type_tb`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `heroes_tb`
--
ALTER TABLE `heroes_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `type_tb`
--
ALTER TABLE `type_tb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `heroes_tb`
--
ALTER TABLE `heroes_tb`
  ADD CONSTRAINT `heroes_tb_ibfk_1` FOREIGN KEY (`type_id`) REFERENCES `type_tb` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
