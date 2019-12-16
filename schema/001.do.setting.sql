CREATE TABLE `settings` (
  `xe_id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(200) DEFAULT NULL,
  `setting_value` varchar(200) DEFAULT NULL,
  `autoload` tinyint(1) DEFAULT '0',
  `is_secure` tinyint(1) DEFAULT '0',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`xe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;


CREATE TABLE `languages` (
  `xe_id` int(10) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `file` varchar(50) DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `is_enable` tinyint(1) DEFAULT '0',
  `is_default` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`xe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;


CREATE TABLE `categories` (
  `xe_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) DEFAULT NULL,
  `asset_type_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `sort_order` smallint(4) DEFAULT '0',
  `is_disable` tinyint(1) NOT NULL DEFAULT '0',
  `is_default` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`xe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;


CREATE TABLE `asset_types` (
  `xe_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  PRIMARY KEY (`xe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;


--
-- Dumping data for table `asset_types`
--

INSERT INTO `asset_types` (`xe_id`, `name`, `slug`) VALUES
(1, 'BackgroundPatterns', 'background-patterns'),
(2, 'Cliparts', 'cliparts'),
(3, 'ColorPalletes', 'color-palletes'),
(4, 'ColorSwatches', 'color-swatch'),
(5, 'Distresses', 'distresses'),
(6, 'Fonts', 'fonts'),
(7, 'GraphicFonts', 'graphic-fonts'),
(8, 'Masks', 'masks'),
(9, 'Shapes', 'shapes'),
(10, 'WordClouds', 'word-clouds');