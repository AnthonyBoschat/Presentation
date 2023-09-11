<?php
require "main_function.php";
session_start();

if(isset($_POST["datas"]))
{
    $json_datas = $_POST["datas"];
    $datas = json_decode($json_datas);

    // A ce stade, $datas est similaire au datas de javascript
    // On va avoir besoin de l'id du nom de la recette pour continuer la requete de suppression, on la récupère
    $PDO = connection_PDO("boulangerie");
    $query_recup_recette_id = $PDO->prepare("SELECT recette_id FROM user_recette_list WHERE recette_name = :recette_name AND user_id = :user_id");
    $query_recup_recette_id->bindParam(":recette_name", $datas->recette_name);
    $query_recup_recette_id->bindParam(":user_id", $_SESSION["ID"]);
    $query_recup_recette_id->execute();
    // La requete renvoie forcément quelque chose, le nom de la recette est forcément existante dans la base de odnnée, ça a été verifier par save_recette_treatment response.status = update
    $recette_id = $query_recup_recette_id->fetch(PDO::FETCH_ASSOC)["recette_id"];
    
    $query_delete_recette = $PDO->prepare("DELETE FROM user_recette_details WHERE recette_id = :recette_id");
    $query_delete_recette->bindParam(":recette_id", $recette_id);
    $query_delete_recette->execute();

    // On peut ré-enregistrer la recette maintenant

    // On récupère de $datas le détail des ingrédients
    $ingredient_tableau = $datas->ingredient_poid;
    // On récupère le nombre d'élément que contient le tableau
    $longueur_tableau = count($ingredient_tableau);
    // On boucle pour autant de requête que d'élément à envoyer
    for($i = 0; $i < $longueur_tableau; $i++)
    {
        // On regarde dans la liste des ingredient dans la BDD si l'ingredient existe déjà
        $query_take_id_ingredient = $PDO->prepare("SELECT ingredient_id
                                                FROM ingredients_list
                                                WHERE ingredient_name = :ingredient_name");
        $query_take_id_ingredient->bindParam(":ingredient_name", $ingredient_tableau[$i]->nom);
        $query_take_id_ingredient->execute();
        // S'il ne trouve pas d'ingredient qui a ce nom, il l'enregistre
        if(!$query_take_id_ingredient->fetch(PDO::FETCH_ASSOC))
        {
            $query_save_ingredient = $PDO->prepare("INSERT INTO ingredients_list(ingredient_name)
                                                    VALUE(:ingredient_name)");
            $query_save_ingredient->bindParam(":ingredient_name", $ingredient_tableau[$i]->nom);
            $query_save_ingredient->execute();
        }
        // A ce stade là, il y a forcément un champ avec le nom de l'ingredient et son id, on récupère donc son id, on réexecute la requete
        $query_take_id_ingredient->execute();
        // On récupère l'id
        $ingredient_id = $query_take_id_ingredient->fetch(PDO::FETCH_ASSOC)["ingredient_id"];

        $query_save_line = $PDO->prepare("  INSERT INTO user_recette_details(recette_id, ingredient_name, ingredient_poid)
                                            VALUES
                                            (
                                                :recette_id, :ingredient_name, :ingredient_poid
                                            )");

        $query_save_line->bindParam("recette_id", $recette_id);
        $query_save_line->bindParam("ingredient_name", $ingredient_id);
        $query_save_line->bindParam("ingredient_poid", $ingredient_tableau[$i]->poid);
        $query_save_line->execute();
    }
    $response["status"] = true;
}

echo json_encode($response);