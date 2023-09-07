DROP TABLE user_information;
CREATE TABLE IF NOT EXISTS user_information
(
    user_id INT AUTO_INCREMENT,
    user_name VARCHAR(65),
    user_password VARCHAR(65),

    UNIQUE(user_name),
    PRIMARY KEY(user_id)
);

DROP TABLE user_recette_list;
CREATE TABLE IF NOT EXISTS user_recette_list
(
    user_id INT,
    recette_id INT AUTO_INCREMENT,
    recette_name VARCHAR(65),

    PRIMARY KEY(recette_id)
);
DROP TABLE user_recette_details;
CREATE TABLE IF NOT EXISTS user_recette_details
(
    recette_id INT,
    ingredient_name VARCHAR(65),
    ingredient_poid VARCHAR(65)
);
DROP TABLE ingredients_list;
CREATE TABLE IF NOT EXISTS ingredients_list
(
    ingredient_id INT AUTO_INCREMENT,
    ingredient_name VARCHAR(65),

    UNIQUE(ingredient_name),
    PRIMARY KEY(ingredient_id)
);
DROP TABLE poid_list;
CREATE TABLE IF NOT EXISTS poid_list
(
    poid_id INT AUTO_INCREMENT,
    poid_value VARCHAR(65),

    UNIQUE(poid_value),
    PRIMARY KEY(poid_id)
);

select * from user_information;
select * from user_recette_list;
select * from user_recette_details;
select * from ingredients_list;



INSERT INTO user_information(user_name, user_password)
VALUES
(
    "Anthony", "sudo"
);

INSERT INTO user_recette(user_id, recette_name)
VALUES
(
    1, "Pain blanc"
);

INSERT INTO user_recette_details(recette_id, ingredient_name, ingredient_poid)
VALUES
(
    
);



