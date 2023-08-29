/* pour reset la base de donnée */

DROP DATABASE if exists caterpillar;
CREATE DATABASE caterpillar;
use caterpillar;
create table if not exists user_connection_information
(
    user_id smallint(6) AUTO_INCREMENT,
    user_name varchar(100),
    user_password varchar(64),

    UNIQUE(user_name),
    PRIMARY KEY(user_id)
);


create table if not exists user_level_complete
(
    user_id smallint(6),
    level_1 boolean,
    level_2 boolean,
    level_3 boolean,
    level_4 boolean
);

/* Tout selectionner */
select * from user_connection_information;
select * from user_level_complete;
/* Insertion d'information */

insert into user_connection_information (user_name, user_password)
values
("Anthony", "sudo");

/* EXEMPLE : Pour insérer le score d'un joueur */
insert into user_level_complete (user_id, level_name, level_complete)
values
(1, "level_1", 1),
(1, "level_2", 0),
(1, "level_3", 0),
(1, "level_4", 0);

/* CONTROLE */

SELECT * FROM user_level_complete WHERE user_id = 1;