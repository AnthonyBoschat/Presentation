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

function query_connexion($PDO)
{
    return true;
}

function query_inscription($PDO, $user_name, $user_password)
{
    // On verifie qu'un utilisateur dans la base de donnée n'existe pas déjà avec ce nom
    $query = $PDO->prepare("SELECT user_name FROM user_information WHERE user_name = :user_name");
    $query->bindParam(":user_name", $user_name);
    $query->execute();
    $response = $query->fetch(PDO::FETCH_ASSOC);
    // Si la réponse ne contient aucun élément, le nom d'utilisateur n'est pas déjà utiliser, l'inscription est possible
    if(!$response)
    {
        return "Aucun utilisateur trouver avec ce nom, inscription possible";
        
    }
    // Si la réponse contient des éléments, le nom d'utilisateur est déjà utiliser, l'inscription est impossible
    else if($response)
    {
        return "Un utilisateur existe déjà avec ce nom, inscription impossible";
    }
}