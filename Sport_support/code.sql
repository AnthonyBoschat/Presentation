DROP DATABASE IF EXISTS musculation;
CREATE DATABASE IF NOT EXISTS musculation;
USE musculation;

DROP TABLE IF EXISTS muscle;
CREATE TABLE muscle
(
    muscle_id smallint(6) AUTO_INCREMENT,
    muscle_name varchar(30),

    PRIMARY KEY(muscle_id)
);

DROP TABLE IF EXISTS exercice;
CREATE TABLE exercice
(
    muscle_id smallint(6),
    exercice_id smallint(6) AUTO_INCREMENT,
    exercice_name varchar(100),

    PRIMARY KEY(exercice_id)
);

DROP TABLE IF EXISTS exercice_detail;
CREATE TABLE exercice_detail
(
    exercice_id smallint(6),
    poid float,
    repetition smallint(6),
    repos varchar(6),
    controle boolean,
    validate boolean
);

INSERT INTO muscle(muscle_name)
VALUES
("Pectoraux"),
("Dos"),
("Biceps / Triceps"),
("Jambes"),
("Epaule / Abdo");



select * from muscle;
select * from exercice;
select * from exercice_detail;