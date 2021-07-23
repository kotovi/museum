CREATE TABLE `desk` (
                        `id` bigint(20) NOT NULL AUTO_INCREMENT,
                        `desk_description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                        `desk_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                        `moderator_id` bigint(20) DEFAULT NULL,
                        PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `file` (
                        `id` bigint(20) NOT NULL AUTO_INCREMENT,
                        `create_date_time` datetime DEFAULT NULL,
                        `creator_id` bigint(20) DEFAULT NULL,
                        `file_description` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                        `file_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                        `file_type` int(11) DEFAULT NULL,
                        `random_file_name` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                        `report_id` bigint(20) DEFAULT NULL,
                        PRIMARY KEY (`id`),
                        KEY `FK24fpwohmav1a7flei2em0qqq3` (`report_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;



CREATE TABLE `notification` (
                                `id` bigint(20) NOT NULL AUTO_INCREMENT,
                                `complite_notification_date_time` datetime DEFAULT NULL,
                                `create_notification_date_time` datetime DEFAULT NULL,
                                `notification_body` varchar(5000) COLLATE utf8_bin DEFAULT NULL,
                                `notification_recipient` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                                `notification_status` int(11) DEFAULT NULL,
                                `notification_subject` varchar(3000) COLLATE utf8_bin DEFAULT NULL,
                                `source_id` bigint(20) DEFAULT NULL,
                                `unsubscribeuuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                                PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `reports` (
                           `id` bigint(20) NOT NULL AUTO_INCREMENT,
                           `report_annotation` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                           `report_status` int(11) DEFAULT NULL,
                           `report_theme` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                           `user_id` bigint(20) DEFAULT NULL,
                           PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `seminar` (
                           `id` bigint(20) NOT NULL AUTO_INCREMENT,
                           `creator_id` bigint(20) DEFAULT NULL,
                           `en_seminar_description` varchar(3000) COLLATE utf8_bin DEFAULT NULL,
                           `en_seminar_name` varchar(3000) COLLATE utf8_bin DEFAULT NULL,
                           `join_url` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
                           `meeting_id` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                           `meeting_record_url` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
                           `meeting_status` int(11) DEFAULT NULL,
                           `record_status` int(11) DEFAULT NULL,
                           `seminar_begin_date` datetime DEFAULT NULL,
                           `seminar_create_date` datetime DEFAULT NULL,
                           `seminar_create_url` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
                           `seminar_description` varchar(3000) COLLATE utf8_bin DEFAULT NULL,
                           `seminar_name` varchar(3000) COLLATE utf8_bin DEFAULT NULL,
                           PRIMARY KEY (`id`),
                           KEY `FKgn2fmhr5y0w02j9nhd6lf013e` (`creator_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `SPRING_SESSION` (
                                  `PRIMARY_ID` char(36) COLLATE utf8_bin NOT NULL,
                                  `SESSION_ID` char(36) COLLATE utf8_bin NOT NULL,
                                  `CREATION_TIME` bigint(20) NOT NULL,
                                  `LAST_ACCESS_TIME` bigint(20) NOT NULL,
                                  `MAX_INACTIVE_INTERVAL` int(11) NOT NULL,
                                  `EXPIRY_TIME` bigint(20) NOT NULL,
                                  `PRINCIPAL_NAME` varchar(100) COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

CREATE TABLE `SPRING_SESSION_ATTRIBUTES` (
                                             `SESSION_PRIMARY_ID` char(36) COLLATE utf8_bin NOT NULL,
                                             `ATTRIBUTE_NAME` varchar(200) COLLATE utf8_bin NOT NULL,
                                             `ATTRIBUTE_BYTES` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

CREATE TABLE `tezis` (
                         `id` bigint(20) NOT NULL AUTO_INCREMENT,
                         `author_id` bigint(20) DEFAULT NULL,
                         `tezis_add_date` datetime DEFAULT NULL,
                         `tezis_annotation` varchar(3000) COLLATE utf8_bin DEFAULT NULL,
                         `tezis_name` varchar(3000) COLLATE utf8_bin DEFAULT NULL,
                         PRIMARY KEY (`id`),
                         KEY `FKcedmqvwk5wsa1dns5oq22ky56` (`author_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `user_roles` (
                              `user_id` bigint(20) NOT NULL,
                              `roles` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                              KEY `FKg6agnwreityp2vf23bm2jgjm3` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `usr` (
                       `id` bigint(20) NOT NULL AUTO_INCREMENT,
                       `active` bit(1) DEFAULT NULL,
                       `degree` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
                       `delete_date` datetime DEFAULT NULL,
                       `firstname` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                       `is_deleted` bit(1) DEFAULT NULL,
                       `lastname` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                       `notification_agree` int(11) DEFAULT NULL,
                       `notificationuuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                       `organization` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
                       `organization_post_address` varchar(1000) COLLATE utf8_bin DEFAULT NULL,
                       `password` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                       `password_request_date` datetime DEFAULT NULL,
                       `passworduuid` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                       `phone_number` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                       `registration_date` datetime DEFAULT NULL,
                       `secname` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                       `user_email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                       `user_role` int(11) DEFAULT NULL,
                       `username` varchar(255) COLLATE utf8_bin DEFAULT NULL,
                       `who_deleted` bigint(20) DEFAULT NULL,
                       PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

