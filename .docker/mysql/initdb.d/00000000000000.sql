CREATE DATABASE IF NOT EXISTS `local`;

CREATE DATABASE IF NOT EXISTS `test`;

GRANT ALL PRIVILEGES ON `local`.* TO 'troublesome' @'%';

GRANT ALL PRIVILEGES ON `test`.* TO 'troublesome' @'%';