<?php
require "function.php";
// On démarre la session utilisateur
session_start();
// Controle_connection = False == L'utilisateur n'est pas encore connecter
$controle_connection = false;

// On verifie que les champs de saisi sont correctement rempli
if($informations = verification_champ_saisi_rempli())
{
    // On récupère les informations donnée dans verification_champ_saisi_rempli
    $user_name = $informations["user_name"];
    $user_password = $informations["user_password"];
    // On se connecte à PDO
    $PDO = connection_PDO("boulangerie");
    // On lance la fonction qui permet de determiner si le bouton connection ou inscription est appuyer
    $input = inscription_connexion_controle();
    // On lance les fonction de query pour la connexion ou l'inscription
    // Pour l'inscription
    if($input == "inscription")
    {
        // On verifie si le nom d'utilisateur existe déjà
        // Si True, l'utilisateur peut etre inscrit
        if(verif_nom_utilisateur($PDO, $user_name))
        {
            inscription($PDO, $user_name, $user_password);
            console(("Les informations utilisateur ont bien été enregistrés dans la base de donnée"));
            // On passe $controle_connection à true, l'utilisateur est connecté
            $controle_connection = true;
        }
        // Si autre chose que true, l'utilisateur ne peut pas etre inscrit
        else
        {
            console("Inscription impossible, nom d'utilisateur déjà utiliser");
        }
    }
    // Pour la connexion
    else if($input == "connection")
    {
        // On verifie qu'un utilisateur avec ce nom existe dans la base de donnée
        // Si False, le nom d'utilisateur existe, on peut verifier le mot de passe
        if(!verif_nom_utilisateur($PDO, $user_name))
        {
            // On verifie que le mot de passe correspond
            // Si true, le mot de passe correspond, l'utilisateur peut être connecté
            if(verif_mot_de_passe($PDO, $user_name, $user_password))
            {
                console("Le mot de passe saisie est correcte, l'utilisateur peut être connecté");
                // On passe $controle_connection à true, l'utilisateur est connecté
                $controle_connection = true;
            }
            // Si autre que True, le mot de passe n'est pas valide pour l'utilisateur
            else
            {
                console("Le mot de passe est incorrecte");
            }
        }
        // Si autre chose que false, aucun nom d'utilisateur trouver, ne peut pas être connecter
        else
        {
            console("Ce nom d'utilisateur n'existe pas, connection impossible");
        }
    }
}

// On défini des variables de SESSION si l'utilisateur est parvenu à se connecter
if($controle_connection == true)
{
    console("controle connection = true, Etablissement des variables de SESSION");
    $_SESSION["user_name"] = $user_name;
    $_SESSION["ID"] =  recuperation_ID($PDO, $_SESSION["user_name"]);
    console($_SESSION["user_name"]);
    console($_SESSION["ID"]);
    header("Location: http://localhost/Pr%c3%a9sentation/Boulangerie/main_page/");
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="login_style.css">
    <title>Identification</title>
</head>
<body>
    
    <main>
        <form method="post" action="" id="connection_box">
            <div id="saisi_box">
                <div>
                    <div class="texte">Nom d'utilisateur :</div>
                    <input type="text" class="input" name="name">
                </div>
                <div>
                    <div class="texte">Mot de passe :</div>
                    <input type="password" class="input" name="password">
                </div>
            </div>
            <div id="submit_box">
                <input type="submit" value="Connexion" class="submit" name="connection">
                <input type="submit" value="Inscription" class="submit" name="inscription">
            </div>
        </form>
    </main>
    
<script src="login_javascript.js"></script>
</body>
</html>