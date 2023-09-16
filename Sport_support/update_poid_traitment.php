<?php

if(isset($_POST["data"]))
{
    // On récupère l'objet
    $object = json_decode($_POST["data"]);
    // On récupère le nom de l'exercice et le poid
    $exercice_name = $object->exercice_name;
    $poid = $object->poid;
    // On se connecte à PDO
    $PDO = connection_PDO("musculation");
    // On récupère l'id de l'exercice
    $query_recup_id_exercice = $PDO->prepare("SELECT exercice_id 
                                            FROM exercice
                                            WHERE exercice_name = :exercice_name");

    $query_recup_id_exercice->bindParam(":exercice_name", $exercice_name);
    $query_recup_id_exercice->execute();
    // on verifie que la requête a renvoyer quelque chose
    $answer = $query_recup_id_exercice->fetch(PDO::FETCH_OBJ);
    if($answer)
    {
        $ID = $answer->exercice_id;
        // On regarde si l'exercice existe déjà ou non
        $query_verif_exist = $PDO->prepare("SELECT exercice_id 
                                            FROM exercice_detail 
                                            WHERE exercice_id = :exercice_id");

        $query_verif_exist->bindParam(":exercice_id", $ID);
        $query_verif_exist->execute();
        $answer = $query_verif_exist->fetch(PDO::FETCH_OBJ);
        // Si l'exercice existe déjà, c'est une mise à jour
        if($answer)
        {
            $query_update_poid = $PDO -> prepare("  UPDATE exercice_detail
                                                    SET poid = :poid
                                                    WHERE exercice_id = :exercice_id");

            $query_update_poid->bindParam(":poid", $poid);
            $query_update_poid->bindParam(":exercice_id", $ID);
            $query_update_poid->execute();
            $response["status"] = true;
        }
        // Sinon, il faut l'enregistrer
        else if(!$response)
        {
            $query_save_poid = $PDO -> prepare("INSERT INTO exercice_detail(exercice_id, poid)
                                                VALUES (:exercice_id, :poid)");
            
            $query_save_poid->bindParam(":exercice_id", $ID);
            $query_save_poid->bindParam(":poid", $poid);
            $query_save_poid->execute();
            $response["status"] = true;
        }
        
    }
    else if(!$response)
    {
        $response["status"] = false;
    }
}

echo json_encode($response);