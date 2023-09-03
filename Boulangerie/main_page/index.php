<?php
require "../login_page/function.php";
// On continue la session de l'utilisateur
session_start();
// Si l'utilisateur veut se deconnecter
if(isset($_POST["deconnection"]))
{
    fin_de_session();
    header("Location: http://localhost/Pr%C3%A9sentation/Boulangerie/login_page/login.php");
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenue</title>
</head>
<body>
    <p>Bienvenue <?= $_SESSION["user_name"] ?></p>
    <form action="" method="post"><input type="submit" value="Se déconnecter" name="deconnection"></form>
</body>
</html>