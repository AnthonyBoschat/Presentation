<?php

function console($x)
{
    echo "<script>console.log(\"$x\")</script>";
}

function pre($x)
{
    echo "<pre>";
    print_r($x);
    echo "</pre>";
}

function controle_button_clic($x)
{
    // Si l'utilisateur clique sur le bouton X
    if(isset($_POST[$x]))
    {
        // On verifie que les deux champs sont rempli
        if(isset($_POST["user_name"]) && !empty($_POST["user_name"]))
        {
            if(isset($_POST["user_password"]) && !empty($_POST["user_password"]))
            {
                // Les informations ont correctement été renseigner
                // on stock les informations de connection dans des variables
                $user_name = htmlspecialchars($_POST["user_name"]);
                $user_password = htmlspecialchars($_POST["user_password"]);

                // On définie les paramètres obligatoire pour la classe PDO
                $DB_DSN = "mysql:host=localhost; dbname=caterpillar";
                $DB_USER = "root";
                $DB_PASS = "";
                $options = 
                [
                    PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
                ];

                // On initialise la variable $PDO en amont
                $PDO = null;

                // On se connecte à PDO grâce à la fonction
                $PDO = connection_pdo($PDO, $DB_DSN, $DB_USER, $DB_PASS, $options);

                // on return les informations
                $information = array(
                    "name" => $user_name,
                    "password" => $user_password,
                    "PDO" => $PDO
                );
                return $information;
            }
        }
    }
    return false;
}

// fonction pour se connecter à la base de donnée
function connection_pdo($x, ...$y)
{
    try
    {
        $x = new PDO(...$y);
        return $x;
    }
    catch(PDOException $error)
    {
        echo "Erreur : ".$error->getMessage();
    }
    

}

// Fonction pour inscrire l'utilisateur, et mettre à jour la base de donnée
function inscription($x, $user_name, $user_password)
{
    // On prepare la requete qui va récupérer l'id de l'utilisateur
    $requete = $x->prepare("SELECT user_id FROM user_connection_information WHERE user_name = :user_name");
    // On définie la valeur :user_name
    $requete->bindParam(":user_name", $user_name);
    // On lance la requête
    $requete->execute();

    // Si la requête renvoie quelque chose ( s'il y a plus de 0 ligne ) c'est que le nom d'utilisateur existe déjà, et on ne peut pas l'inscrire
    if($requete->rowCount() > 0)
    {
        console("Nom d'utilisateur déjà utiliser");
        return false;
    }

    // Si la requête ne renvoie rien, l'utilisateur peut etre inscrit
    else
    {
        // On prépare la requete d'enregistrement des données de connection de l'utilisateur
        $requete = $x->prepare("INSERT INTO user_connection_information (user_name, user_password) 
                                VALUES (:user_name, SHA2(:user_password, 256))");
        // On définie les valeurs user_name et user_pawword
        $requete->bindParam(":user_name", $user_name);
        $requete->bindParam(":user_password", $user_password);
        // On execute la requete
        $requete->execute();


        // On re prepare une requete pour obtenir l'id de l'utilisateur
        $requete = $x->prepare("SELECT user_id 
                                FROM user_connection_information 
                                WHERE user_name = :user_name");
        // On définie la valeur user_name
        $requete->bindParam(":user_name", $user_name);
        // On lance la requête
        $requete->execute();
        // On récupère maintenant l'id en AUTO INCREMENT attribuer à l'utilisateur
        $data_line = $requete->fetch(PDO::FETCH_ASSOC); // On récupère la requete sous forme d'un tableau associatif
        if($data_line) // Si $data_line n'est pas vide
        {
            $user_id = $data_line["user_id"]; // On récupère l'id de l'utilisateur dans le tableau ($data_line["user_id"]) dans la variable user_id
        }

        // On prépare la requete d'initialisation de la table user_level_complete pour l'utilisateur
        $requete = $x->prepare("INSERT INTO user_level_complete ( user_id, level_1, level_2, level_3, level_4 ) 
                                VALUES (:user_id, 0, 0, 0, 0)");
        // On définie les valeurs user_id
        $requete->bindParam(":user_id", $user_id);
        // On execute la requete
        $requete->execute();

        console("Utilisateur a pu être inscrit et les tables ont été initialiser");

        // On renvoie l'id
        $information = array(
            "ID" => $user_id
        );

        return $information;
    }
}

function connection($x, $user_name, $user_password)
{
    // On prepare une requete pour verifier que le nom d'utilisateur existe
    $requete = $x->prepare("SELECT user_name 
                            FROM user_connection_information 
                            WHERE user_name = :user_name");
    // On définie la valeur de :user_name
    $requete->bindParam(":user_name", $user_name);
    // On lance la requête
    $requete->execute();

    $data_line = $requete->fetch(PDO::FETCH_ASSOC);    
    // Si la requête renvoie quelque chose, c'est que le nom d'utilisateur existe
    
    if($data_line)
    {
        // On récupère l'information user_name
        $user_name_initial = $data_line["user_name"];
        console("controle initial 157: ".$user_name_initial);
        // On prepare une requête pour comparer le hashage du mot de passe renseigner avec celui inscrit dans la base de donnée
        // OLD : $requete = $x->prepare("SELECT user_name FROM user_connection_information WHERE user_password = SHA2(:user_password, 256)");
        $requete = $x->prepare("SELECT user_name FROM user_connection_information WHERE user_password = SHA2(:user_password, 256) AND user_name = :user_name");
        // On définie la valeur de :user_password et :user_name
        $requete->bindParam(":user_password", $user_password);
        $requete->bindParam(":user_name", $user_name);
        // On lance la requête
        $requete->execute();

        // On récupère l'information user_name si la requete renvoie quelque chose
        $data_line = $requete->fetch(PDO::FETCH_ASSOC);

        // Si la requete à renvoyer quelque chose
        if($data_line == true)
        {
            $user_name_comparaison = $data_line["user_name"];
            console("controle comparaison 174 : ".$user_name_comparaison);
            if($user_name_initial === $user_name_comparaison)
            {
                // On prépare une requete pour renvoyer son id
                $requete = $x->prepare("SELECT user_id FROM user_connection_information WHERE user_name = :user_name");
                $requete->bindParam(":user_name", $user_name_initial);
                $requete->execute();

                $data_line = $requete->fetch(PDO::FETCH_ASSOC);
                $user_id = $data_line["user_id"];
                $information = array(
                    "ID" => $user_id
                );
                console("Connection réussi");
                return $information;
            }
        }
        else
        {
            console("Le mot de passe est incorrecte");
            return false;
        }
        
        
    }
    else
    {
        console("Nom d'utilisateur ou mot de passe inconnue");
        return false;
    }
}

function recuperation_level_complete($PDO, $id)
{
    $requete = $PDO->prepare("SELECT * FROM user_level_complete WHERE user_id = $id");
    $requete->execute();
    $informations = $requete->fetchAll(PDO::FETCH_ASSOC);
    return $informations[0];
}

function controle_level_check($x, $y)
{
    if($x[$y] == 1)
    {
        echo "<i class=\"fa-solid fa-check\"></i>";
    }
}