DROP DATABASE IF EXISTS todo;
CREATE DATABASE IF NOT EXISTS todo;
USE todo;

DROP TABLE IF EXISTS todo_categorie;
CREATE TABLE todo_categorie
(
    user_name varchar(65),
    todo_categorie varchar(65)
);

DROP TABLE IF EXISTS todo_list;
CREATE TABLE todo_list
(
    user_name varchar(65),
    todo_categorie varchar(65),
    todo_content text,
    todo_color text
);




SELECT * FROM todo_list;
SELECT * FROM todo_categorie;
