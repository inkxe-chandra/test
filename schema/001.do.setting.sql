CREATE TABLE `settings` (
  `xe_id` int(11) NOT NULL AUTO_INCREMENT,
  `setting_key` varchar(200) DEFAULT NULL,
  `setting_value` varchar(200) DEFAULT NULL,
  `autoload` tinyint(1) DEFAULT '0',
  `is_secure` tinyint(1) DEFAULT '0',
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`xe_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1