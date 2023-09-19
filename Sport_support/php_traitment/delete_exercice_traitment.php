<?php

if(isset($_POST["data"]))
{
    // On récupère l'objet
    $object = json_decode($_POST["data"]);
    // On récupère le nom de l'exercice et le poid
    $exercice_name = $object->exercice_name;
    // On récupère l'id de l'exercice
    $query_recup_exercice_id = $PDO -> prepare("SELECT exercice_id
                                                FROM exercice
                                                WHERE exercice_name = :exercice_name");
    $query_recup_exercice_id->bindValue(":exercice_name", $exercice_name);
    $query_recup_exercice_id->execute();
    $exercice_id = $query_recup_exercice_id->fetch(PDO::FETCH_OBJ)->exercice_id;
    // On effectue 2 requete pour supprimer dans les 3 tables toutes les informations concernant cet exercice
    $tables = ["exercice", "exercice_detail"];
    foreach($tables as $table)
    {
        $requete = "DELETE FROM $table WHERE exercice_id = :exercice_id";
        $delete_for_exercice_table = $PDO -> prepare($requete);
        $delete_for_exercice_table->bindValue("exercice_id", $exercice_id);
        $delete_for_exercice_table->execute();
    }
    $response["status"] = true;
}

echo json_encode($response);