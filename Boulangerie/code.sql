DROP TABLE user_information;

CREATE TABLE IF NOT EXISTS user_information
(
    user_id INT AUTO_INCREMENT,
    user_name VARCHAR(65),
    user_password VARCHAR(65),

    UNIQUE(user_name),
    PRIMARY KEY(user_id)
);






select * from user_information;



INSERT INTO user_information(user_name, user_password)
VALUES
(
    "Anthony", "sudo"
);
