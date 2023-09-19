<?php

if(isset($_POST["data"]))
{
    // On récupère l'objet
    $object = json_decode($_POST["data"]);
    // On récupère le nom de l'exercice et le poid
    $exercice_name = $object->exercice_name;
    $poid = $object->poid;
    // On récupère l'id de l'exercice
    $query_recup_id_exercice = $PDO->prepare("SELECT exercice_id 
                                            FROM exercice
                                            WHERE exercice_name = :exercice_name");

    $query_recup_id_exercice->bindValue(":exercice_name", $exercice_name);
    $query_recup_id_exercice->execute();
    // on verifie que la requête a renvoyer quelque chose
    $answer = $query_recup_id_exercice->fetch(PDO::FETCH_OBJ);
    // Si on a une réponse
    if($answer)
    {
        // On regarde l'ID
        $ID = $answer->exercice_id;
        // On update le champ correspondant à l'ID de l'exercice
        $query_update_poid = $PDO -> prepare("  UPDATE exercice_detail
                                                SET poid = :poid
                                                WHERE exercice_id = :exercice_id");

        $query_update_poid->bindValue(":poid", $poid);
        $query_update_poid->bindValue(":exercice_id", $ID);
        $query_update_poid->execute();
        $response["status"] = true;
    }
    else if(!$response)
    {
        $response["status"] = false;
    }
}

echo json_encode($response);