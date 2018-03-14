CREATE DATABASE wayfarer;

USE wayfarer;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `user_img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
);


DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `post_id` int(11) NOT NULL,
  `subject` varchar(45) NOT NULL,
  `text` varchar(45) NOT NULL,
  `post_img` varchar(45) DEFAULT NULL,
  `city` varchar(45) NOT NULL,
  `country` varchar(45) NOT NULL,
  `latitude` varchar(45) NOT NULL,
  `longitude` varchar(45) NOT NULL,
  `user_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`post_id`)
);


DROP TABLE IF EXISTS `comments`;

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `text` varchar(45) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`comment_id`)
);
