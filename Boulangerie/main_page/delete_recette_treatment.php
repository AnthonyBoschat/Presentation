<?php
require "main_function.php";
session_start();
$response = array();
if(isset($_POST["datas"]))
{
    $recette_name = json_decode($_POST["datas"]);
    // On prepare une requete sql pour récupérer l'id de la recette qui porte ce nom
    $PDO = connection_PDO("boulangerie");
    $query_recup_id = $PDO->prepare("SELECT recette_id 
                                    FROM user_recette_list 
                                    WHERE recette_name = :recette_name");
    $query_recup_id->bindParam(":recette_name", $recette_name);
    $query_recup_id->execute();
    $ID = $query_recup_id->fetch(PDO::FETCH_ASSOC);
    // Si une id est trouver
    if($ID)
    {
        $ID = $ID["recette_id"];
        $query_delete_recette_list = $PDO->prepare("DELETE FROM user_recette_list
                                                WHERE recette_id = :recette_id");
        $query_delete_recette_list->bindParam(":recette_id", $ID);
        $query_delete_recette_list->execute();

        $query_delete_recette_details = $PDO->prepare("DELETE FROM user_recette_details
                                                        WHERE recette_id = :recette_id");
        $query_delete_recette_details->bindParam(":recette_id", $ID);
        $query_delete_recette_details->execute();

        $response["status"] = true;
    }
    // Si aucune id est trouver
    else
    {
        $response["status"] = false;
    }
}

echo json_encode($response);