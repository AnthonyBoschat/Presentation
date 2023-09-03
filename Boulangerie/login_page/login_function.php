<?php
require "../../../global_tools.php";

// Verification que les champs de saisi sont rempli
function verification_champ_saisi_rempli()
{
    if(isset($_POST["connection"]) || isset($_POST["inscription"]))
    {
        if (isset($_POST["name"]) && !empty($_POST["name"]) &&
            isset($_POST["password"]) && !empty($_POST["password"]))
        {
            $informations = array(
                "user_name" => htmlspecialchars($_POST["name"]),
                "user_password" => htmlspecialchars($_POST["password"])
            );
            return $informations;
        }
        return false;
    }
}

// Savoir si c'est connexion ou inscription qui est appuyer
function inscription_connexion_controle()
{
    if(isset($_POST["connection"]))
    {
        return "connection";
    }
    else if(isset($_POST["inscription"]))
    {
        return "inscription";
    }
}

// Verification qu'un nom d'utilisateur n'existe pas déjà dans la base de donnée
function verif_nom_utilisateur($PDO, $user_name)
{
    // On verifie qu'un utilisateur dans la base de donnée n'existe pas déjà avec ce nom
    $query = $PDO->prepare("SELECT user_name FROM user_information WHERE user_name = :user_name");
    $query->bindParam(":user_name", $user_name);
    $query->execute();
    $response = $query->fetch(PDO::FETCH_ASSOC);
    // Si la réponse ne contient aucun élément, le nom d'utilisateur n'est pas déjà utiliser, l'inscription est possible, la connexion est impossible
    if(!$response)
    {
        return true;
    }
    // Si la réponse contient des éléments, le nom d'utilisateur est déjà utiliser, l'inscription est impossible, la connexion est possible
    else if($response)
    {
        return false;
    }
}

// Verification du mot de passe saisi par l'utilisateur
function verif_mot_de_passe($PDO, $user_name, $user_password)
{
    $query = $PDO->prepare("SELECT user_name
                            FROM user_information 
                            WHERE user_password = SHA2(:user_password, 256)
                            AND user_name = :user_name");
    $query->bindParam(":user_password", $user_password);
    $query->bindParam(":user_name", $user_name);
    $query->execute();
    $response = $query->fetch(PDO::FETCH_ASSOC);
    if($response)
    {
        if($response["user_name"] == $user_name)
        {
            return true;
        }
    }
    return false;
}

// Lancer les requête d'inscription dans la base de donnée
function inscription($PDO, $user_name, $user_password)
{
    $query = $PDO->prepare("INSERT INTO user_information(user_name, user_password)
                            VALUES(
                                :user_name, SHA2(:user_password, 256)
                            )");
    $query->bindParam(":user_name", $user_name);
    $query->bindParam(":user_password", $user_password);
    $query->execute();
    return true;
}

// Récupération de l'ID de l'utilisateur dans la base de donnée
function recuperation_ID($PDO, $user_name)
{
    $query = $PDO->prepare("SELECT user_id
                            FROM user_information
                            WHERE user_name = :user_name");
    $query->bindParam(":user_name", $user_name);
    $query->execute();
    $response = $query->fetch(PDO::FETCH_ASSOC);
    $ID = $response["user_id"];
    return $ID;
}

