<?php

if(isset($_POST["data"]))
{
    // On récupère l'objet
    $object = json_decode($_POST["data"]);
    // On récupère le nom du groupe musculaire et le nom de l'exercice
    $groupe_musculaire = $object->groupe_musculaire;
    $exercice_name = $object->exercice_name;
    $old_exercice_name = $object->old_exercice_name;
    // On se connecte à PDO
    $PDO = connection_PDO("musculation");
    // On prépare une requête pour récupérer l'id du groupe musculaire
    $query_get_id = $PDO->prepare("SELECT muscle_id FROM muscle WHERE muscle_name = :muscle_name");
    $query_get_id -> bindValue(":muscle_name", $groupe_musculaire);
    $query_get_id -> execute();
    $ID_muscle = $query_get_id->fetch(PDO::FETCH_OBJ)->muscle_id;

    // Verifier par rapport au poid
    // Il faut faire le distinguo entre, quand on modifie une table vierge, et quand on modifie un exercice déjà enregistrer
    // On verifie donc dans la table si un exercice porte le nom de $old_exercice_name ( que c'etait une recette déjà enregistrer auparavant )
    $query_verif_exercice = $PDO -> prepare("   SELECT exercice_id
                                                FROM exercice
                                                WHERE exercice_name = :old_exercice_name");
    $query_verif_exercice -> bindValue(":old_exercice_name", $old_exercice_name);
    $query_verif_exercice -> execute();
    $ID_exercice = $query_verif_exercice->fetch(PDO::FETCH_OBJ)->exercice_id;
    // Si $ID renvoie quelque chose, cette recette était déjà enregistrer, on modifie donc cette recette
    if($ID_exercice)
    {
        $query_update_exercice_name = $PDO->prepare("UPDATE exercice 
                                                    SET muscle_id = :muscle_id, exercice_name = :exercice_name
                                                    WHERE exercice_id = :exercice_id");
        $query_update_exercice_name->bindValue(":muscle_id", $ID_muscle);
        $query_update_exercice_name->bindValue(":exercice_name", $exercice_name);
        $query_update_exercice_name->bindValue(":exercice_id", $ID_exercice);
        $query_update_exercice_name->execute();
        $response["status"] = true;
    }
}

echo json_encode($response);