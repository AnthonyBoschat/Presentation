/* pour reset la base de donnée */

DROP DATABASE if exists caterpillar;
CREATE DATABASE caterpillar;
use caterpillar;

create table if not exists user_level_complete
(
    user_id smallint(6),
    level_1 boolean,
    level_2 boolean,
    level_3 boolean,
    level_4 boolean
);

/* Tout selectionner */
select * from user_level_complete;
/* Insertion d'information */

/* EXEMPLE : Pour insérer le score d'un joueur */
insert into user_level_complete (user_id, level_name, level_complete)
values
(1, "level_1", 0),
(1, "level_2", 0),
(1, "level_3", 0),
(1, "level_4", 0);

/* CONTROLE */

SELECT * FROM user_level_complete WHERE user_id = 1;