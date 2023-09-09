<?php
require "main_function.php";
session_start();

if(isset($_POST["data"]))
{
    $response["status"] = true;
    // On récupère la data envoyer par javascript
    $recette_name = json_decode($_POST["data"]);

    // On se connecte à PDO
    $PDO = connection_PDO("boulangerie");

    $query_recup_ID = $PDO->prepare("SELECT recette_id FROM user_recette_list WHERE recette_name = :recette_name");
    $query_recup_ID->bindParam(":recette_name", $recette_name);
    $query_recup_ID->execute();
    $recette_id = $query_recup_ID->fetch(PDO::FETCH_ASSOC)["recette_id"];
    // On a récupérer l'id du nom de la recette, maintenant, on doit récupérer la liste des ingrédient et leurs poids avec une requête complexe
    $query_recup_ingredient_poid = $PDO->prepare("  SELECT ingredients_list.ingredient_name, user_recette_details.ingredient_poid
                                                    FROM ingredients_list, user_recette_details
                                                    WHERE user_recette_details.ingredient_name = ingredients_list.ingredient_id
                                                    AND
                                                    user_recette_details.recette_id = :recette_id");

    $query_recup_ingredient_poid->bindParam(":recette_id", $recette_id);
    $query_recup_ingredient_poid->execute();
    $liste = $query_recup_ingredient_poid->fetchAll(PDO::FETCH_ASSOC);
    
    $response["liste"] = $liste;

}
else
{
    $response["status"] = false;
}

echo json_encode($response);