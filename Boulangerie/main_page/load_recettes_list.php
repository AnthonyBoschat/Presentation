<?php
require "../../../global_tools.php";
session_start();

//On initialise $response ( on peut s'en passer )
$response = array();

// On va effectue une requette pour recupérer le nom des recettes de l'utilisateur
$PDO = connection_PDO("boulangerie");

$query_recup_list = $PDO->prepare(" SELECT recette_name
                                    FROM user_recette_list
                                    WHERE user_id = :user_id");

$query_recup_list->bindParam(":user_id", $_SESSION["ID"]);
$query_recup_list->execute();

$lists = $query_recup_list->fetchAll(PDO::FETCH_ASSOC);
// Soit la requête a renvoyer des éléments, soit elle est vide car l'utilisateur n'a pas encore enregistrer de recette
// Si la requête renvoie quelque chose
if(!empty($lists))
{
    $response["status"] = true;
    $response["liste"] = $lists;
}
// Si elle ne contient rien
else
{
    $response["status"] = false;
}

echo json_encode($response);