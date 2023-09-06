<?php
require "login_function.php";
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
            // On passe $controle_connection à true, l'utilisateur est connecté
            $controle_connection = true;
        }
        // Si autre chose que true, l'utilisateur ne peut pas etre inscrit
        else
        {
            header("Location: login.php?erreur_inscription");
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
                // On passe $controle_connection à true, l'utilisateur est connecté
                $controle_connection = true;
            }
            // Si autre que True, le mot de passe n'est pas valide pour l'utilisateur
            else
            {
                header("Location: login.php?erreur_connexion");
            }
        }
        // Si autre chose que false, aucun nom d'utilisateur trouver, ne peut pas être connecter
        else
        {
            header("Location: login.php?erreur_connexion");
        }
    }
}

// On défini des variables de SESSION si l'utilisateur est parvenu à se connecter
if($controle_connection == true)
{
    $_SESSION["user_name"] = $user_name;
    $_SESSION["ID"] =  recuperation_ID($PDO, $_SESSION["user_name"]);
    header("Location: ../main_page/main.php");
}