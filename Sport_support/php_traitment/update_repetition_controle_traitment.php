<?php

if(isset($_POST["data"]))
{
    // On récupère l'objet
    $object = json_decode($_POST["data"]);
    // On récupère le nom de l'exercice, le poid, les repetition
    $exercice_name = $object->exercice_name;
    $poid = $object->poid;
    $repetition = $object->repetition;
    // On récupère l'id de l'exercice
    $query_recup_exercice_ID = $PDO -> prepare("SELECT exercice_id 
                                                FROM exercice
                                                WHERE exercice_name = :exercice_name");
    $query_recup_exercice_ID->bindvalue(":exercice_name", $exercice_name);
    $query_recup_exercice_ID->execute();
    $exercice_id = $query_recup_exercice_ID->fetch(PDO::FETCH_OBJ)->exercice_id;

    // On gère les différent cas pour les repetitions de l'exercice
    // 1 --- 6 ou 8 repetition -> on augmente la repetiion de 2 dans la base de donnée pour l'exercice
    // 2 --- 10 repetition -> On verifie en php dans la BDD si le controle est à 0 ou 1
    // -> 0 -> passe à 1
    // -> 1 -> passe les repetition à 6, le controle à 0, le poid à +2.5
    switch($repetition)
    {
        case 6:
        case 8:
            $query_add2_to_repetition = $PDO -> prepare("UPDATE exercice_detail
                                                        SET repetition = :new_repetition
                                                        WHERE exercice_id = :exercice_id");
            $query_add2_to_repetition->bindvalue(":new_repetition", $repetition + 2);
            $query_add2_to_repetition->bindvalue(":exercice_id", $exercice_id);
            $query_add2_to_repetition->execute();
            break;

        case 10:
            // On récupère la valeur de controle pour la repetition
            $query_recup_controle = $PDO -> prepare("SELECT controle
                                                    FROM exercice_detail
                                                    WHERE exercice_id = :exercice_id");
            $query_recup_controle->bindvalue(":exercice_id", $exercice_id);
            $query_recup_controle->execute();
            $controle_value = $query_recup_controle->fetch(PDO::FETCH_OBJ)-> controle;

            // différent cas pour la valeur de controle
            switch($controle_value)
            {
                case 0:
                    $query_add_1_to_controle = $PDO->prepare("UPDATE exercice_detail
                                                            SET controle = 1
                                                            WHERE exercice_id = :exercice_id");
                    $query_add_1_to_controle->bindvalue(":exercice_id", $exercice_id);
                    $query_add_1_to_controle->execute();
                    break;
                
                case 1:
                    $query_restore_controle = $PDO->prepare("UPDATE exercice_detail
                                                            SET controle = 0
                                                            WHERE exercice_id = :exercice_id");
                    $query_restore_controle->bindvalue(":exercice_id", $exercice_id);
                    $query_restore_controle->execute();

                    $query_restore_to_6_repetition = $PDO -> prepare("UPDATE exercice_detail
                                                                    SET repetition = 6
                                                                    WHERE exercice_id = :exercice_id");
                    $query_restore_to_6_repetition->bindvalue(":exercice_id", $exercice_id);
                    $query_restore_to_6_repetition->execute();

                    $query_update_poid = $PDO->prepare("UPDATE exercice_detail
                                                        SET poid = :new_poid
                                                        WHERE exercice_id = :exercice_id");
                    $query_update_poid->bindvalue(":new_poid", $poid + 2.5);
                    $query_update_poid->bindvalue(":exercice_id", $exercice_id);
                    $query_update_poid->execute();
                    break;
                
                default:
                    $response["status"] = false;
                    break;
            }
        break;

        default:
            $response["status"] = false;
            break;
    }

    // On passe le validate à 1
    $query_update_validate = $PDO->prepare("UPDATE exercice_detail
                                            SET validate = 1
                                            WHERE exercice_id = :exercice_id");
    $query_update_validate->bindvalue(":exercice_id", $exercice_id);
    $query_update_validate->execute();

    // On signale la réussite des opérations
    $response["status"] = true;
}

echo json_encode($response);