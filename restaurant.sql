-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 16, 2017 at 06:00 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) NOT NULL,
  `booking_date` datetime NOT NULL,
  `booking_from` time NOT NULL,
  `booking_to` time NOT NULL,
  `table_id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobile` bigint(20) NOT NULL,
  `status` bit(1) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `restaurant_id`, `booking_date`, `booking_from`, `booking_to`, `table_id`, `customer_name`, `email`, `mobile`, `status`, `created_date`, `last_updated`) VALUES
(1, 14, '2017-03-17 00:00:00', '10:00:00', '11:00:00', 3, 'ketan pradhan', 'ketanbgm@gmail.com', 7795282023, b'1', '2017-03-15 21:15:02', '2017-03-15 21:15:02'),
(6, 14, '2017-03-17 00:00:00', '11:00:00', '12:00:00', 3, 'ketan pradhan', 'ketanbgm@gmail.com', 7795282023, b'0', '2017-03-15 21:33:45', '2017-03-15 21:33:45'),
(11, 14, '2017-03-15 00:00:00', '12:00:00', '13:00:00', 3, 'ketan pradhan', 'ketanbgm@gmail.com', 7795282023, b'1', '2017-03-15 23:05:58', '2017-03-15 23:05:58'),
(12, 14, '2017-03-18 00:00:00', '12:00:00', '13:00:00', 3, 'ketan pradhan', 'ketanbgm@gmail.com', 7795282023, b'0', '2017-03-15 23:28:23', '2017-03-15 23:28:23'),
(13, 14, '2017-03-18 00:00:00', '11:00:00', '12:00:00', 3, 'ketan pradhan', 'ketanbgm@gmail.com', 7795282023, b'0', '2017-03-15 23:47:09', '2017-03-15 23:47:09'),
(14, 14, '2017-03-08 00:00:00', '11:00:00', '12:00:00', 3, 'ketan pradhan', 'ketanbgm@gmail.com', 7795282023, b'1', '2017-03-16 01:42:34', '2017-03-16 01:42:34'),
(17, 14, '2017-03-28 00:00:00', '11:00:00', '12:00:00', 3, 'ketan pradhan', 'ketanbgm@gmail.com', 7795282023, b'1', '2017-03-16 20:18:02', '2017-03-16 20:18:02'),
(18, 14, '2017-03-20 00:00:00', '11:00:00', '12:00:00', 3, 'ketan pradhan', 'ketanbgm@gmail.com', 7795282023, b'1', '2017-03-16 20:25:51', '2017-03-16 20:25:51'),
(20, 14, '2017-03-17 00:00:00', '21:00:00', '22:00:00', 3, 'ketan pradhan', 'ketanbgm@gmail.com', 7795282023, b'1', '2017-03-16 21:23:48', '2017-03-16 21:23:48');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `id` int(11) NOT NULL,
  `restaurant_name` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `mobile` bigint(20) DEFAULT NULL,
  `type` varchar(250) DEFAULT NULL,
  `locality` varchar(50) DEFAULT NULL,
  `address` text,
  `city` varchar(50) DEFAULT NULL,
  `state` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_update` datetime DEFAULT CURRENT_TIMESTAMP,
  `open_time` varchar(8) NOT NULL,
  `close_time` varchar(8) NOT NULL,
  `status` bit(1) NOT NULL DEFAULT b'1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`id`, `restaurant_name`, `email`, `mobile`, `type`, `locality`, `address`, `city`, `state`, `created_date`, `last_update`, `open_time`, `close_time`, `status`) VALUES
(14, 'chicken china town', 'ccktown@gmail.com', 7795282023, 'restaurant', 'madiwala', '576, bsk 3rd stage', 'bangalore', 'karnataka', '2017-03-14 00:28:38', '2017-03-14 00:28:38', '10:00', '22:00', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `review` varchar(250) NOT NULL,
  `review_description` varchar(250) DEFAULT NULL,
  `restaurant_id` int(11) NOT NULL,
  `created_date` date DEFAULT NULL,
  `last_update` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `customer_name`, `email`, `review`, `review_description`, `restaurant_id`, `created_date`, `last_update`) VALUES
(1, 'ketan', 'ketanbgm@gmail.com', 'Good', 'test test test', 14, NULL, '2017-03-15'),
(2, 'ketan', 'ketanbgm@gmail.com', 'Good', 'test test test', 14, NULL, '2017-03-15');

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `id` int(11) NOT NULL,
  `restaurant_id` int(11) DEFAULT NULL,
  `table_no` varchar(10) DEFAULT NULL,
  `capacity` int(11) DEFAULT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`id`, `restaurant_id`, `table_no`, `capacity`, `created_date`, `last_updated`) VALUES
(3, 14, 'tb07', 4, '2017-03-15 10:34:05', '2017-03-15 10:34:05');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`),
  ADD KEY `table_id` (`table_id`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `mobile` (`mobile`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_ibfk_1` (`restaurant_id`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`),
  ADD KEY `restaurant_id` (`restaurant_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `restaurant`
--
ALTER TABLE `restaurant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`),
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`table_id`) REFERENCES `tables` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`);

--
-- Constraints for table `tables`
--
ALTER TABLE `tables`
  ADD CONSTRAINT `tables_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
