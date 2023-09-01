<?php
require "../../../global_tools.php";
require "function.php";
// On démarre la session utilisateur
session_start();

// On verifie que les champs de saisi sont correctement rempli
if(verification_champ_saisi_rempli())
{
    console("ok");
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