DROP DATABASE IF EXISTS chat;
CREATE DATABASE IF NOT EXISTS chat;
USE chat;

DROP TABLE IF EXISTS message_detail;
CREATE TABLE IF NOT EXISTS message_detail
(
    user_id INT,
    message_content TEXT
);

INSERT INTO message_detail(user_id, message_content)
VALUES
(1, "Je m'appelle Anthony"),
(2, "Je m'appelle Benoit");


select * from message_detail;

SELECT login.user_information.user_name, chat.message_detail.message_content
FROM chat.message_detail
INNER JOIN login.user_information
ON login.user_information.user_id = chat.message_detail.user_id;
