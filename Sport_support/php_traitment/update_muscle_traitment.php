<?php

if(isset($_POST["data"]))
{
    // On récupère le tableau
    $tableau = json_decode($_POST["data"]);
    // On prépare une requête pour supprimer les données de la table muscle
    $query_delete_muscle = $PDO->prepare("TRUNCATE TABLE muscle");
    $query_delete_muscle->execute();
    // On boucle pour insérer autant de champs que de nom de muscle du tableau
    for($i = 0; $i<count($tableau); $i++)
    {
        // On prepare une requête d'insertion
        $query_insert_into = $PDO->prepare("INSERT INTO muscle(muscle_name)
                                            VALUES (:muscle_name)");
        $query_insert_into->bindParam(":muscle_name", $tableau[$i]);
        $query_insert_into->execute();
    }


    $response["status"] = true;
}
else
{
    $response["status"] = false;
}

echo json_encode($response);