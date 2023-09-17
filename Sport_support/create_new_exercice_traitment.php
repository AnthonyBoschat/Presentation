<?php

if(isset($_POST["data"]))
{
    $response["status"] = true;
    // On récupère l'objet
    $object = json_decode($_POST["data"]);
    // On récupère le nom du groupe musculaire
    $groupe_musculaire = $object->groupe_musculaire;
    $exercice_name = $object->exercice_name;
    // On se connecte à PDO
    $PDO = connection_PDO("musculation");
    // On initialise toute les tables avec un exercice vierge
    // On récupère l'id du groupe musculaire
    $query_recup_id_muscle = $PDO -> prepare("SELECT muscle_id
                                                FROM muscle
                                                WHERE muscle_name = :muscle_name");
    $query_recup_id_muscle ->bindValue(":muscle_name", $groupe_musculaire);
    $query_recup_id_muscle->execute();
    $ID = $query_recup_id_muscle->fetch(PDO::FETCH_OBJ)->muscle_id;

    // On initialise la table exercice
    // Ne marche pas en brut
    $query_init_exercice_table = $PDO -> prepare("  INSERT INTO exercice(muscle_id, exercice_name)
                                                    VALUES(:muscle_id, :exercice_name)");
    $query_init_exercice_table->bindValue(":muscle_id", $ID);
    $query_init_exercice_table->bindValue(":exercice_name", $exercice_name);
    $query_init_exercice_table->execute();

    // On récupère l'ID de l'exercice nouvellement créé
    $query_recup_id_exercice = $PDO -> prepare("SELECT exercice_id
                                                FROM exercice
                                                WHERE exercice_name = :exercice_name");
    $query_recup_id_exercice ->bindValue(":exercice_name", $exercice_name);
    $query_recup_id_exercice->execute();
    $answer = $query_recup_id_exercice->fetchAll(PDO::FETCH_OBJ);
    $ID = end($answer)->exercice_id;
    // On initialise exercice_detail
    $query_init_exerciceDetail_table = $PDO -> prepare("INSERT INTO exercice_detail(exercice_id, poid, repetition, repos, controle)
                                                        VALUES(:exercice_id, :poid, :repetition, :repos, :controle)");
    $query_init_exerciceDetail_table->bindValue(":exercice_id", $ID);
    $query_init_exerciceDetail_table->bindValue(":poid", 0);
    $query_init_exerciceDetail_table->bindValue(":repetition", 10);
    $query_init_exerciceDetail_table->bindValue(":repos", 0);
    $query_init_exerciceDetail_table->bindValue(":controle", 0);
    $query_init_exerciceDetail_table->execute();

    $response["status"] = true;
}

echo json_encode($response);