<?php
session_start();
require "main_function";
// Si la requete d'envoie coté js est passer et la variable est déclarer
if(isset($_POST["datas"]))
{
    // On récupère datas ( encoder en json )
    $json_datas = $_POST["datas"];
    // On décode le json
    $datas = json_decode($json_datas);

    // à ce stade, $datas est similaire au $datas de javascript

    // On va commencer par enregistrer la recette dans la table user_recette
    // On récupère de $datas le nom de la recette
    $recette_name = $datas->recette_name;
    // On se connecte à PDO
    $PDO = connection_PDO("boulangerie");
    // On prépare une requête pour vérifier que l'utilisateur ne possède pas déjà une recette d'enregistrer avec ce nom
    $query_verif_exist = $PDO->prepare("SELECT recette_name 
                                        FROM user_recette_list 
                                        WHERE recette_name = :recette_name 
                                        AND user_id = :user_id");
    // On passe les paramètres de la requête
    $query_verif_exist->bindParam(":recette_name", $recette_name);
    $query_verif_exist->bindParam(":user_id", $_SESSION["ID"]);

    // On execute la requête
    $query_verif_exist->execute();
    // Si la requête ne renvoie rien, aucune recette ne possède ce nom pour cet utilisateur, la recette peut être enregistrer
    if(!$query_verif_exist->fetch(PDO::FETCH_ASSOC))
    {
        // On prepare une requête pour enregistrer la recette dans la base de donnée
        $query_save_recette_name = $PDO->prepare("  INSERT INTO user_recette_list(user_id, recette_name)
                                                    VALUES
                                                    (
                                                        :user_id, :recette_name
                                                    )");

        $query_save_recette_name->bindParam(":user_id", $_SESSION["ID"]);
        $query_save_recette_name->bindParam(":recette_name", $recette_name);
        $query_save_recette_name->execute();

        // La recette est sauvegarder dans user_recette
        // Maintenant, il faut enregistrer les ingrédient et leurs poids dans user_recette_details
        // On va avoir besoin de l'id de la recette
        $query_recuperation_id_recette = $PDO->prepare("SELECT recette_id FROM user_recette_list WHERE recette_name = :recette_name AND user_id = :user_id");
        $query_recuperation_id_recette -> bindParam(":recette_name", $recette_name);
        $query_recuperation_id_recette -> bindParam(":user_id", $_SESSION["ID"]);
        $query_recuperation_id_recette->execute();
        $recette_id = $query_recuperation_id_recette->fetch(PDO::FETCH_ASSOC)["recette_id"];

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
    else
    {
        // A placer la mise à jour de la recette
        $response["status"] = "update";
    }
}
else
{
    $response["status"] = false;
}

echo json_encode($response);