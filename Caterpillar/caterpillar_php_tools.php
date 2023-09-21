<?php

function inscription_caterpillar($PDO)
{
    $query_verif_exist_ID = $PDO -> prepare("SELECT user_id
                                            FROM user_level_complete
                                            WHERE user_id = :user_id");
    $query_verif_exist_ID->bindValue(":user_id", $_SESSION["ID"]);
    $query_verif_exist_ID->execute();
    $response = $query_verif_exist_ID->fetch(PDO::FETCH_OBJ);

    // S'il ne trouve rien
    if(!$response)
    {
        // On inscrit l'utilisateur
        $query_inscription_user = $PDO -> prepare("INSERT INTO user_level_complete (user_id, level_1, level_2, level_3, level_4)
                                                    Values
                                                    (:user_id, 0, 0, 0, 0);");
        $query_inscription_user->bindValue(":user_id", $_SESSION["ID"]);
        $query_inscription_user->execute();
    }
}

function recuperation_level_complete($PDO, $id)
{
    $requete = $PDO->prepare("SELECT * FROM user_level_complete WHERE user_id = $id");
    $requete->execute();
    $informations = $requete->fetchAll(PDO::FETCH_ASSOC);
    return $informations[0];
}

function controle_level_check($x, $y)
{
    if($x[$y] == 1)
    {
        echo "<i class=\"fa-solid fa-check\"></i>";
    }
}