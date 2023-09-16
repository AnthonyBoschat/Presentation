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
    exercice_name varchar(30),

    PRIMARY KEY(exercice_id)
);

DROP TABLE IF EXISTS exercice_detail;
CREATE TABLE exercice_detail
(
    exercice_id smallint(6),
    poid smallint(6),
    repetition smallint(6)
);

DROP TABLE IF EXISTS exercice_memory;
CREATE TABLE exercice_memory
(
    exercice_id smallint(6),
    poid smallint(6),
    repetition smallint(6),
    controle boolean
);

INSERT INTO muscle(muscle_name)
VALUES
("Pectoraux"),
("Dos"),
("Biceps / Triceps"),
("Jambes"),
("Epaule / Abdo");

INSERT INTO exercice(muscle_id, exercice_name)
VALUES
(1, "Développer coucher haltère")


select * from muscle;
select * from exercice;
select * from exercice_detail;
select * from exercice_memory;

