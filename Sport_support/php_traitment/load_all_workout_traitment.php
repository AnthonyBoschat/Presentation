<?php
// On initialise un objet vide
$object = new stdClass();
// On se connecte à PDO
$PDO = connection_PDO("musculation");
// On effectue une requête pour récupérer tout les exercice_ID présent dans exercice
$query_recup_all_exerciceID = $PDO -> prepare("SELECT exercice_id FROM exercice");
$query_recup_all_exerciceID->execute();
// On stock les exercice dans une variable
$ALL_ID = $query_recup_all_exerciceID->fetchAll(PDO::FETCH_OBJ);
// Si la requête renvoie quelque chose, on boucle dedans pour effectuer une requete correspondante à cette ID
if($ALL_ID)
{
    for($i = 0; $i<count($ALL_ID); $i++)
    {
        // On effectue une requete avec deux jointures pour récupérer tout ce dont nous avons besoin
        $query_recup_detail_exercice_x = $PDO->prepare("SELECT muscle.muscle_name, exercice.exercice_name, exercice_detail.poid, exercice_detail.repetition, exercice_detail.repos
                                                        FROM exercice
                                                        INNER JOIN exercice_detail
                                                        ON exercice_detail.exercice_id = :exercice_ID
                                                        AND exercice.exercice_id = :exercice_ID
                                                        INNER JOIN muscle
                                                        ON exercice.muscle_id = muscle.muscle_id");
        $query_recup_detail_exercice_x->bindValue(":exercice_ID", $ALL_ID[$i]->exercice_id);
        $query_recup_detail_exercice_x->execute();
        $row = $query_recup_detail_exercice_x->fetch(PDO::FETCH_OBJ);
        $object->$i = $row;
    }
    $response["status"] = true;
    $response["data"] = $object;
}
else
{
    $response["status"] = false;
}

echo json_encode($response);