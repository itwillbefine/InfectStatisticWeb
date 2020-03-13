/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 80016
Source Host           : localhost:3306
Source Database       : cov

Target Server Type    : MYSQL
Target Server Version : 80016
File Encoding         : 65001

Date: 2020-03-13 16:31:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for details
-- ----------------------------
DROP TABLE IF EXISTS `details`;
CREATE TABLE `details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `province` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `confirm` int(11) DEFAULT NULL,
  `confirm_add` int(11) DEFAULT NULL,
  `heal` int(11) DEFAULT NULL,
  `dead` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=434 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for history
-- ----------------------------
DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `ds` date DEFAULT NULL,
  `confirmtim` bigint(20) DEFAULT NULL,
  `confirm_ad` bigint(20) DEFAULT NULL,
  `suspect` bigint(20) DEFAULT NULL,
  `suspect_ad` bigint(20) DEFAULT NULL,
  `healirm_ad` bigint(20) DEFAULT NULL,
  `heal_add` bigint(20) DEFAULT NULL,
  `dead` bigint(20) DEFAULT NULL,
  `dead_add` bigint(20) DEFAULT NULL,
  `now_confirm` int(11) DEFAULT NULL,
  `now_severe` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
