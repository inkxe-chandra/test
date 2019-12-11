-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2019 at 09:31 AM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inkxe_x`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `xe_id` int(11) NOT NULL,
  `store_id` int(11) DEFAULT NULL,
  `asset_type_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `sort_order` smallint(4) DEFAULT 0,
  `is_disable` tinyint(1) NOT NULL DEFAULT 0,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`xe_id`, `store_id`, `asset_type_id`, `parent_id`, `name`, `sort_order`, `is_disable`, `is_default`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 0, 'country', NULL, 0, 0, '2019-08-06 18:17:15', NULL),
(2, 1, 2, 0, 'seasons', NULL, 0, 0, '2019-08-06 18:17:15', NULL),
(3, 1, 2, 0, 'event', NULL, 0, 0, '2019-08-06 18:17:15', NULL),
(4, 1, 2, 0, 'test', NULL, 0, 0, '2019-08-06 18:17:15', '2019-09-19 14:21:12'),
(5, 1, 2, 0, 'mascot', NULL, 0, 0, '2019-08-06 18:17:15', NULL),
(6, 1, 2, 0, 'nature', NULL, 0, 1, '2019-08-06 18:17:15', '2019-11-25 23:13:35'),
(7, 1, 2, 0, 'sports-games', NULL, 0, 1, '2019-08-06 18:17:15', '2019-11-25 23:13:35'),
(8, 1, 2, 0, 'animal', NULL, 0, 1, '2019-08-06 18:17:15', '2019-11-25 23:13:35'),
(9, 1, 2, 0, 'baby-family', NULL, 0, 0, '2019-08-06 18:17:15', NULL),
(10, 1, 2, 0, 'company', NULL, 0, 0, '2019-08-06 18:17:15', NULL),
(11, 1, 2, 0, 'transportation', NULL, 0, 0, '2019-08-06 18:17:15', NULL),
(12, 1, 2, 0, 'charity', NULL, 0, 0, '2019-08-06 18:17:15', NULL),
(13, 1, 2, 1, 'Malaysia', NULL, 0, 0, '2019-08-06 18:19:16', NULL),
(14, 1, 2, 0, 'USA', NULL, 0, 0, '2019-08-06 18:19:16', NULL),
(15, 1, 2, 1, 'Thailand', NULL, 0, 0, '2019-08-06 18:19:16', NULL),
(16, 1, 2, 1, 'India', NULL, 0, 0, '2019-08-06 18:19:16', NULL),
(17, 1, 7, 14, 'Pakistan', NULL, 0, 0, '2019-08-06 18:19:16', NULL),
(18, 1, 2, 2, 'Christmas', NULL, 0, 0, '2019-08-06 18:21:31', NULL),
(19, 1, 2, 2, 'Halloween', NULL, 0, 0, '2019-08-06 18:21:31', NULL),
(20, 1, 2, 2, 'New Year', NULL, 0, 0, '2019-08-06 18:21:31', NULL),
(21, 1, 2, 2, 'Love', NULL, 0, 0, '2019-08-06 18:21:31', NULL),
(22, 1, 2, 2, 'birthday', NULL, 0, 0, '2019-08-06 18:21:31', NULL),
(23, 1, 2, 4, 'bbq', NULL, 0, 0, '2019-08-06 19:21:56', NULL),
(24, 1, 2, 4, 'election', NULL, 0, 0, '2019-08-06 19:21:56', NULL),
(25, 1, 2, 4, 'prom', NULL, 0, 0, '2019-08-06 19:21:56', NULL),
(26, 1, 2, 4, 'birthday', NULL, 0, 0, '2019-08-06 19:21:56', NULL),
(27, 1, 2, 4, 'formal', NULL, 0, 0, '2019-08-06 19:21:56', NULL),
(28, 1, 2, 5, 'chef', NULL, 0, 0, '2019-08-06 19:23:10', NULL),
(29, 1, 2, 5, 'food', NULL, 0, 0, '2019-08-06 19:23:10', NULL),
(30, 1, 2, 5, 'wine', NULL, 0, 0, '2019-08-06 19:23:10', NULL),
(31, 1, 2, 5, 'apple', NULL, 0, 0, '2019-08-06 19:23:10', NULL),
(32, 1, 2, 5, 'coffee', NULL, 0, 0, '2019-08-06 19:23:10', NULL),
(33, 1, 2, 5, 'animal', NULL, 0, 0, '2019-08-06 19:23:49', NULL),
(34, 1, 2, 5, 'eagle', NULL, 0, 0, '2019-08-06 19:23:49', NULL),
(35, 1, 2, 5, 'skull', NULL, 0, 0, '2019-08-06 19:23:49', NULL),
(36, 1, 2, 6, 'daisy', NULL, 0, 0, '2019-08-06 19:25:05', NULL),
(37, 1, 2, 6, 'flower', NULL, 0, 0, '2019-08-06 19:25:05', NULL),
(38, 1, 2, 6, 'lightning', NULL, 0, 0, '2019-08-06 19:25:05', NULL),
(39, 1, 2, 6, 'star', NULL, 0, 0, '2019-08-06 19:25:05', NULL),
(40, 1, 2, 6, 'weather', NULL, 0, 0, '2019-08-06 19:25:05', NULL),
(41, 1, 2, 7, 'hunting', NULL, 0, 0, '2019-08-06 19:26:20', NULL),
(42, 1, 2, 7, 'cricket', NULL, 0, 0, '2019-08-06 19:26:20', NULL),
(43, 1, 2, 7, 'football', NULL, 0, 0, '2019-08-06 19:26:20', NULL),
(44, 1, 2, 7, 'ping pong', NULL, 0, 0, '2019-08-06 19:26:20', NULL),
(45, 1, 2, 7, 'running', NULL, 0, 0, '2019-08-06 19:26:20', NULL),
(46, 1, 2, 8, 'lion', NULL, 0, 0, '2019-08-06 19:27:37', NULL),
(47, 1, 2, 8, 'tiger', NULL, 0, 0, '2019-08-06 19:27:37', NULL),
(48, 1, 2, 8, 'elephant', NULL, 0, 0, '2019-08-06 19:27:37', NULL),
(49, 1, 2, 8, 'crabs', NULL, 0, 0, '2019-08-06 19:27:37', NULL),
(50, 1, 2, 16, 'Odisha', NULL, 0, 0, '2019-08-07 12:17:31', NULL),
(51, 1, 5, 0, 'CMYK', 1, 0, 0, '2019-12-05 12:30:41', NULL),
(52, 1, 5, 0, 'RGB', 2, 0, 0, '2019-12-05 12:30:41', NULL),
(53, 1, 5, 0, 'Pantone', 3, 0, 0, '2019-12-05 12:32:04', NULL),
(54, 1, 5, 0, 'Pattern', 4, 0, 0, '2019-12-05 12:32:04', NULL),
(55, 1, 5, 0, 'Embroidery Thread', 5, 0, 0, '2019-12-05 12:32:58', NULL),
(56, NULL, 6, 0, 'New Category 1', 6, 0, 0, '2019-12-05 14:55:26', '2019-12-05 14:55:26'),
(57, NULL, 6, 56, 'Sub category 1', 7, 0, 0, '2019-12-05 14:55:35', '2019-12-05 14:55:35'),
(58, NULL, 6, 56, 'Sub Category 2', 8, 0, 0, '2019-12-05 14:55:47', '2019-12-05 14:55:47'),
(59, NULL, 6, 0, 'New Category 2', 9, 0, 0, '2019-12-05 14:56:11', '2019-12-05 14:56:11'),
(60, NULL, 6, 59, 'Sub category 2', 10, 0, 0, '2019-12-05 14:56:24', '2019-12-05 14:56:24'),
(61, NULL, 5, 51, 'Blue Ocean', 11, 0, 0, '2019-12-06 08:22:14', '2019-12-06 08:30:34'),
(62, NULL, 5, 51, 'Dark apple', 12, 0, 0, '2019-12-06 08:22:26', '2019-12-06 08:30:51'),
(63, NULL, 5, 52, 'Blue', 13, 0, 0, '2019-12-06 08:31:02', '2019-12-06 08:31:02'),
(64, NULL, 5, 52, 'Green', 14, 0, 0, '2019-12-06 08:31:09', '2019-12-06 08:31:09'),
(65, NULL, 5, 53, 'f-403c', 15, 0, 0, '2019-12-06 08:31:19', '2019-12-06 08:31:19'),
(66, NULL, 5, 53, 'Yellowic red ', 16, 0, 0, '2019-12-06 08:31:32', '2019-12-06 08:31:32'),
(67, NULL, 5, 54, 'Clip Png', 17, 0, 0, '2019-12-06 08:31:46', '2019-12-06 08:31:46'),
(69, NULL, 5, 55, 'Thread 1', 19, 0, 0, '2019-12-06 08:32:05', '2019-12-06 08:32:05'),
(70, NULL, 5, 55, 'Thread 2', 20, 0, 0, '2019-12-06 08:32:13', '2019-12-06 08:32:13'),
(71, NULL, 5, 54, 'Ping pong', 21, 0, 0, '2019-12-07 06:44:24', '2019-12-07 06:44:24'),
(72, NULL, 6, 0, 'New category 3', 22, 0, 0, '2019-12-07 11:05:06', '2019-12-07 11:05:06'),
(73, NULL, 6, 72, 'Sub category 1', 23, 0, 0, '2019-12-07 11:05:17', '2019-12-07 11:05:17'),
(74, NULL, 5, 51, 'Magic red', 24, 0, 0, '2019-12-10 06:48:27', '2019-12-10 06:48:27'),
(75, NULL, 5, 54, 'Zick zap', 25, 0, 0, '2019-12-10 06:53:31', '2019-12-10 06:53:31'),
(76, NULL, 5, 54, 'rox', 26, 0, 0, '2019-12-10 06:53:42', '2019-12-10 06:53:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`xe_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `xe_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
