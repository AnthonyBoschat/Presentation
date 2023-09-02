<?php
require "function.php";
// On démarre la session utilisateur
session_start();

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
    if($input == "inscription")
    {
        $retour = query_inscription($PDO, $user_name, $user_password);
        console($retour);
    }
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