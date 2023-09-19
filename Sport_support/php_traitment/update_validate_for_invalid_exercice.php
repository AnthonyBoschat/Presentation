<?php

$object = json_decode($_POST["data"]);
$exercice_name = $object->exercice_name;

// On récupère l'id de l'exercice
$query_recup_exercice_ID = $PDO -> prepare("SELECT exercice_id 
FROM exercice
WHERE exercice_name = :exercice_name");
$query_recup_exercice_ID->bindvalue(":exercice_name", $exercice_name);
$query_recup_exercice_ID->execute();
$exercice_id = $query_recup_exercice_ID->fetch(PDO::FETCH_OBJ)->exercice_id;

// On update le validate à 1
$query_update_valide = $PDO -> prepare("UPDATE exercice_detail
                                        SET validate = 1
                                        WHERE exercice_id = :exercice_id");
$query_update_valide->bindvalue(":exercice_id", $exercice_id);
$query_update_valide->execute();
