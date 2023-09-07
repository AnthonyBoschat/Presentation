DROP TABLE user_information;

CREATE TABLE IF NOT EXISTS user_information
(
    user_id INT AUTO_INCREMENT,
    user_name VARCHAR(65),
    user_password VARCHAR(65),

    UNIQUE(user_name),
    PRIMARY KEY(user_id)
);

DROP TABLE user_recette;
CREATE TABLE IF NOT EXISTS user_recette
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






select * from user_information;
select * from user_recette;
select * from user_recette_details;



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



