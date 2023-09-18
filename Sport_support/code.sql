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
    poid float,
    repetition smallint(6),
    repos varchar(6),
    controle boolean
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



SELECT muscle.muscle_name, exercice.exercice_name, exercice_detail.poid, exercice_detail.repetition, exercice_detail.repos
FROM exercice
INNER JOIN exercice_detail
ON exercice_detail.exercice_id = 2
AND exercice.exercice_id = 2
INNER JOIN muscle
ON exercice.muscle_id = muscle.muscle_id;






