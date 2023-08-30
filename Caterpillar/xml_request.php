<?php

if($_SERVER["REQUEST_METHOD"] === "POST")
{
    $boolean = $_POST["boolean"];
    $colonne = $_POST["colonne"];
    $id = $_POST["id"];
    $DSN = "mysql:host=localhost;dbname=caterpillar";
    $username = "root";
    $password = "";

    try
    {
        $PDO = new PDO($DSN, $username, $password);
        $PDO->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $query = "UPDATE user_level_complete SET $colonne = :boolean WHERE user_id = :user_id";

        $requete = $PDO->prepare($query);
        $requete->bindParam(":boolean", $boolean);
        $requete->bindParam(":user_id", $id);
        $requete->execute();

        echo "Données enregistrés avec succès.";
    }
    catch(PDOException $e)
    {
        echo "Erreur : ".$e->getMessage();
    }
}