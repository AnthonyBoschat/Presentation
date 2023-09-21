DROP DATABASE IF EXISTS login;
CREATE DATABASE IF NOT EXISTS login;
use login;

CREATE TABLE IF NOT EXISTS user_information
(
    user_id INT AUTO_INCREMENT,
    user_name VARCHAR(65),
    user_password VARCHAR(65),

    UNIQUE(user_name),
    PRIMARY KEY(user_id)
);