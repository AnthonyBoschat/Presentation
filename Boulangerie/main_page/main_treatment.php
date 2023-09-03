<?php

require "../login_page/login_function.php";
// On continue la session de l'utilisateur
session_start();
// Si l'utilisateur veut se deconnecter
if(isset($_POST["deconnection"]))
{
    fin_de_session();
    header("Location: ../login_page/login.php");
}