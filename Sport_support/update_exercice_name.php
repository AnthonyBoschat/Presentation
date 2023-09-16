<?php

if(isset($_POST["data"]))
{
    // On récupère l'objet
    $object = json_decode($_POST["data"]);
    // On récupère le nom du groupe musculaire
    $groupe_musculaire = $object->groupe_musculaire;
    $exercice_name = $object->exercice_name;
    // On se connecte à PDO
    $PDO = connection_PDO("musculation");
    // On prépare une requête pour récupérer l'id du groupe musculaire
    $query_get_id = $PDO->prepare("SELECT muscle_id FROM muscle WHERE muscle_name = :muscle_name");
    $query_get_id -> bindParam(":muscle_name", $groupe_musculaire);
    $query_get_id -> execute();
    $id = $query_get_id->fetch(PDO::FETCH_OBJ)->muscle_id;
    // On verifie que l'exercice n'existe pas déjà
    $query_verification_exercice_name = $PDO->prepare("SELECT exercice_name FROM exercice WHERE exercice_name = :exercice_name");
    $query_verification_exercice_name->bindParam(":exercice_name", $exercice_name);
    $query_verification_exercice_name->execute();
    // Si la requete ne renvoie rien
    if(!$query_verification_exercice_name->fetch(PDO::FETCH_OBJ))
    {
        // On prépare une requête pour mettre à jour la table exercice
        $query_update_exercice_name = $PDO->prepare("INSERT INTO exercice(muscle_id, exercice_name)
        VALUES
        (:muscle_id, :exercice_name)");

        $query_update_exercice_name->bindParam(":muscle_id", $id);
        $query_update_exercice_name->bindParam(":exercice_name", $exercice_name);
        $query_update_exercice_name->execute();

        $response["status"] = true;
    }
    // Et si elle renvoie quelque chose, l'exercice existe déjà
    else
    {
        $response["status"] = false;
    }
}

echo json_encode($response);