<?php

if($_SERVER["REQUEST_METHOD"] === "POST")
{
    $boolean = $_POST["boolean"];
    $colonne = $_POST["colonne"];
    $DSN = "mysql:host=localhost;dbname=caterpillar";
    $username = "root";
    $password = "";

    try
    {
        $PDO = new PDO($DSN, $username, $password);
        $PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "UPDATE user_level_complete SET $colonne = :boolean WHERE user_id = 1";

        $requete = $PDO->prepare($query);
        $requete->bindParam(":boolean", $boolean);
        $requete->execute();

        echo "Données enregistrés avec succès.";
    }
    catch(PDOException $e)
    {
        echo "Erreur : ".$e->getMessage();
    }
}