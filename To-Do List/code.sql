DROP DATABASE IF EXISTS todo;
CREATE DATABASE IF NOT EXISTS todo;
USE todo;

DROP TABLE IF EXISTS todo_list;
CREATE TABLE todo_list
(
    user_name varchar(65),
    todo_content text,
    todo_color text
);




SELECT * FROM todo_list;

INSERT INTO todo_list(user_name, todo_content, todo_color)
VALUES
(:user_name, :todo_content, :todo_color);
